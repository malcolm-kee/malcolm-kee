---
title: Bash & Linux
---

The following two formats of check file are the same:

```bash
if test -f "foo.txt"; then

fi
```

```bash
if [ -f "foo.txt" ]; then

fi
```

---

It seems like `[[ ]]` is preferred over `[ ]` syntax.

`[ ]` will eval the expression literally so you need to be careful if the variable that you evaluate is empty string, which may cause syntax error if bash will ignore empty string.

`[[ ]]` is more specific syntax so you don't need to worry about that.

To illustrate, see the following example:

```bash
if [ $MSG == "0" ]; then
	echo "do something.";
fi
```

If `MSG` is an empty string, bash will evaluate the code above as:

```bash
if [  == "0" ]; then
	echo "do something.";
fi
```

Therefore it will throws error.

To fix the code, there are two solutions:

1. wrap the `MSG` variable with double quotes:

   ```bash
   if [ "$MSG" == "0" ]; then
   ```

2. use double brackets:

   ```bash
   if [[ $MSG == "0" ]; then
   ```

---

There are 3 main layers of Linux:

- user process
- linux kernel
- hardware

---
