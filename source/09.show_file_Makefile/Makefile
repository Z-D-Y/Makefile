
CROSS_COMPILE = arm-linux-
AS		= $(CROSS_COMPILE)as
LD		= $(CROSS_COMPILE)ld
CC		= $(CROSS_COMPILE)gcc
CPP		= $(CC) -E
AR		= $(CROSS_COMPILE)ar
NM		= $(CROSS_COMPILE)nm

STRIP		= $(CROSS_COMPILE)strip
OBJCOPY		= $(CROSS_COMPILE)objcopy
OBJDUMP		= $(CROSS_COMPILE)objdump

# 导出变量，这样子目录可以使用
export AS LD CC CPP AR NM
export STRIP OBJCOPY OBJDUMP

# Wall表示列出所有警告 -O2表示优化选项 -g表示加上调试信息
# =表示延时变量，使用时确定其值，且不能在后面追加内容
# :=表示立即变量，其值立即确定
# +=表示追加内容
# -I表示指定目录
# (shell pwd)表示获得当前目录
CFLAGS := -Wall -O2 -g
CFLAGS += -I $(shell pwd)/include
# -l表示指定库
# -lm表示数学库、-lfreetype表示freetype库
LDFLAGS := -lm -lfreetype

export CFLAGS LDFLAGS

# 顶层目录
TOPDIR := $(shell pwd)
export TOPDIR

# 目标
TARGET := show_file

obj-y += main.o
obj-y += display/
obj-y += draw/
obj-y += encoding/
obj-y += fonts/

# 这里使用-f是因为
# 缺省情况下，当make寻找makefile文件时，它试图搜寻具有如下的名字的文件，按顺序：‘GNUmakefile’、‘makefile’和‘Makefile’。
# 通常情况下您应该把您的makefile文件命名为‘makefile’或‘Makefile’。
# (我们推荐使用‘Makefile’，因为它基本出现在目录列表的前面，后面挨着其它重要的文件如‘README’等。)。
# 虽然首先搜寻‘GNUmakefile’，但我们并不推荐使用。除非您的makefile文件是特为GNU make编写的，在其它make版本上不能执行，
# 您才应该使用‘GNUmakefile’作为您的makefile的文件名。
# 如果make不能发现具有上面所述名字的文件，它将不使用任何makefile文件。
# 这样您必须使用命令参数给定目标，make试图利用内建的隐含规则确定如何重建目标。详细内容参见使用隐含规则一节。
# 如果您使用非标准名字makefile文件，您可以使用‘-f’或‘--file’参数指定您的makefile文件。
# 参数‘-f name’或‘--file=name’能够告诉make读名字为‘name’的文件作为makefile文件。
# 如果您使用 ‘-f’或‘--file’参数多于一个，意味着您指定了多个makefile文件，所有的makefile文件按具体的顺序发生作用。
# 一旦您使用了‘-f’或‘--file’参数，将不再自动检查是否存在名为‘GNUmakefile’、‘makefile’或‘Makefile’的makefile文件。
all : 
	make -C ./ -f $(TOPDIR)/Makefile.build
	$(CC) $(LDFLAGS) -o $(TARGET) built-in.o

clean:
	rm -f $(shell find -name "*.o")
	rm -f $(TARGET)

distclean:
	rm -f $(shell find -name "*.o")
	rm -f $(shell find -name "*.d")
	rm -f $(TARGET)