---
layout: page
title: Lua VM Memory Optimization & Stack Recovery System
description: a solution that minimizes memory of lua codes.
img: assets/projects/lua_memory/img/cover.png
importance: 3
category: Work
related_publications: false
equation: true
featured: true
toc:
  sidebar: left
---

## 0. Overview

+ **Role:** Lua source code change and Tool developing

+ **Team Size:** Only me

+ **Timeline:** 2024 in AFK: Journey

+ **Tools:** C, Lua, Python

+ **Achievement:** Minimize Lua memory usage from 30MB to 15MB in a large-scale online game with over 20 million lines lua code.

+ **Core Concept:** Standard Lua stores a `lineinfo` array (an integer for every single instruction) and `locvars` array (a structure for every defined local variable). 
By removing these arrays and only keeping the `linedefined` (start line of the function) and calculating the current line using the `PC` (Program Counter) offset at runtime, the memory use of lua VM was minimized while maintaining the ability to reconstruct the stack trace offline.

---
## 1. Problem

Lua is widely used in the game industry. However, its too light framework has many problems when developers use it on a large-scale system. One of the problems is the memory usage for its debug information.

Look at its structure of `Proto`, the lua source code structure of function information:
{% highlight c linenos %}
typedef struct Proto {
	CommonHeader;
	lu_byte numparams;  /* number of fixed (named) parameters */
	lu_byte is_vararg;
	lu_byte maxstacksize;  /* number of registers needed by this function */
	int sizeupvalues;  /* size of 'upvalues' */
	int sizek;  /* size of 'k' */
	int sizecode;
	int sizelineinfo;
	int sizep;  /* size of 'p' */
	int sizelocvars;
	int sizeabslineinfo;  /* size of 'abslineinfo' */
	int linedefined;  /* debug information  */
	int lastlinedefined;  /* debug information  */
	TValue *k;  /* constants used by the function */
	Instruction *code;  /* opcodes */
	struct Proto **p;  /* functions defined inside the function */
	Upvaldesc *upvalues;  /* upvalue information */
	ls_byte *lineinfo;  /* information about source lines (debug information) */
	AbsLineInfo *abslineinfo;  /* idem */
	LocVar *locvars;  /* information about local variables (debug information) */
	TString  *source;  /* used for debug information */
	GCObject *gclist;
} Proto;
{% endhighlight %}

The `Proto` structure contains much debug information, such as `lineinfo` and `locvars`, and this information use much memory because Lua need to record all line information to recover the stack when running errors happen.

See the following test, we wrote some lua codes:
{% highlight lua linenos %}
function add(a,b)
    return a+b
end
add(10)
{% endhighlight %}

And if we run the codes, we could get following error message and tracing stack:
{% highlight text linenos %}
D:\Downloads\Tools\bin\lua.exe: ...229liu.github.io\assets\projects\lua_memory\doc\test.lua:2: attempt to perform arithmetic on a nil value (local 'b')
stack traceback:
        ...229liu.github.io\assets\projects\lua_memory\doc\test.lua:2: in function 'add'
        ...229liu.github.io\assets\projects\lua_memory\doc\test.lua:5: in main chunk
        [C]: in ?
{% endhighlight %}

The file path and function position was stored in the `Proto` Class. 

Do developers remove the information? Lua offers a solution when we build binary files.
<a href="https://www.lua.org/manual/5.4/manual.html#lua_dump">https://www.lua.org/manual/5.4/manual.html#lua_dump</a>

We can use `luac.c -s a.lua` to strip debug information when building binary files. However, the tracing stacks was untraceable. Like following:
{% highlight text linenos %}
D:\Downloads\Tools\bin\lua.exe: ?:-1: attempt to perform arithmetic on a nil value
stack traceback:
        ?: in function 'add'
        ?: in main chunk
        [C]: in ?
{% endhighlight %}

We had many online bugs, so it is important to show full stack in publishing environment. If we want to reduce memory, we will change lua source code to enable the stacks to be recovered.

> The purpose is that I want to remove lua debug info, but allows programmers to recover the striped call stacks by tools.

Besides, the method would prevent outsiders from hacking our lua code due to all information has removed. 

---
## 2. Solution

I analyzed the stripping logic in `luac.c` and designed a custom stripping strategy.
I should recover 2 things, lua file name and function line.

### 2.1 File Name

In `luac` exportation, it remains all absolute file path or empty (`-s` or not). I replaced empty output with related file path to preserve file information. 
For example, `assets\projects\lua_memory\doc\test.lua` to `doc\test.lua`.

I changed the function in `ldump.c`:
{% highlight c linenos %}
static void dumpFunction (DumpState *D, const Proto *f, TString *psource) {
  if (D->strip || f->source == psource)
  {
#if defined(LUA_OPTIMIZE)
    if(f->source == psource)
    {
       dumpString(D, NULL);  /* no debug info or same source as its parent */
    }
    else
      dumpLocalPath(D, f->source);
#else
    dumpString(D, NULL);  /* no debug info or same source as its parent */
#endif
  }
{% endhighlight %}

### 2.2 Function Line

I found the error print positions and researched how the functions get error lines, and I found that all errors print get lines by two parameters, `linedefine` and `pc`.
`linedefine` is where is the function defined in the file and `PC` is the offest in the function.

I only print these two information, and I could use same lua codes to find where errors locate.

I change many ways, and following is one of places:
{% highlight c linenos %}
/*
** The use of 'lua_pushfstring' ensures this function does not
** need reserved stack space when called.
*/
static const char* LuaG_addinfo(lua_State *L, const char *msg, TString *src,
                                        int linedefine, int pc) {
  char buff[LUA_IDSIZE];
  if (src)
    luaO_chunkid(buff, getstr(src), tsslen(src));
  else {  /* no source available; use "?" instead */
    buff[0] = '?'; buff[1] = '\0';
  }
  return luaO_pushfstring(L, "[Code] %s, %d, %d: %s", buff, linedefine, pc, msg);
}
{% endhighlight %}

### 2.3 Result

Finally, the output error stacks is following:
{% highlight text linenos %}
D:\SourceCode\liuyulin_framework_main\Tools\iGameDll\igame-lua54-static\x64\Debug\igame-lua.exe: [Code] doc/test.lua, 1, 1: attempt to perform arithmetic on a nil value ([localName] @doc/test.lua, 1, 1, 1 '')
stack traceback:
        [Code] doc/test.lua, 1, 1 : function 'add'
        [Code] doc/test.lua, 0, 5 : main chunk
        [C]: in ?
{% endhighlight %}

---
## 3 Recover Method

After changing lua source code, I implemented a tool that helps programmers recover the stacks after they get the stacks.

I wrote a lua file `lua-stack-recover.c`, which is similar with `lua.c` and `luac.c`. 
I parse the stacks in the file, and call Lua APIs to recover original stacks. Following is part of codes:
{% highlight text linenos %}
#define CACHE_LINE_SIZE 512
static void parse(const Proto* f)
{
 FILE *file = fopen(input_path, "r");
 if(file == NULL) {
  printf("Failed to open the file.\n");
  return;
 }
    
 char line[CACHE_LINE_SIZE];
 char *separate;

 while(fgets(line, sizeof(line), file)) {
  char outputLine[CACHE_LINE_SIZE] = "";
  strcpy(outputLine, line);
  char preStr[CACHE_LINE_SIZE] = "";
  char postStr[CACHE_LINE_SIZE] = "";
  
  // Check if the line contains [Code]
  char internLine[CACHE_LINE_SIZE];
  strcpy(internLine, line);
  char* token = strstr(internLine, "[Code]");
  if(token != NULL)
  {
   char sourcePath[CACHE_LINE_SIZE];
   int lineDefined = 0, pc = 0;
   token += 6; // skip past [Code]
   separate = strtok(token, ",");
   if(separate != NULL) {
    removeSpaces(separate, sourcePath);
    // printf("Source Path: %s, ", sourcePath);
   }
   ......
  }
  ......
 }
    
 fclose(file);
}
{% endhighlight %}

### 3.1 Visual Tool

I designed a simple python tools to show the error locations and made the `lua-stack-recover.c` use easily.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/projects/lua_memory/img/python_tool.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>