# Some useful git commands

| Table of Contents |
|-------------------|
| [Top](#) |
| [Nice git commits](#nice-git-commits) |
| [How to edit a commit message](#how-to-edit-a-commit-message) |

## Nice git commits
If you need to see every commit you've made in a repository and want it to look nice, you can run the following command:
```bash
git --no-pager log --pretty=format:"%C(red)%h%C(reset) : %C(green)%ad%C(reset)%n%C(blue)%s%C(reset)%n%C(yellow)%b%C(reset)"
```
It prints all the commits in a pretty format that looks like:
```
<HASH> : <TIMESTAMP>
<Commit message>
```
in different colours! Here is how the command works:
 - `git --no-pager log` - display all the git log, without using it's pager so it's easy to copy-paste
 - `--pretty=format:"..."` - use the following format string for display

Git log comes with a bunch of different formats you can try as well! To use them run `git --no-pager log --pretty=<format>`. Here is a list of everything! (Or you can [skip to the format string](#format-strings))

- `oneline`: Compact single-line summary. Useful for quick scans.

```
<hash> <title-line>
```
```
git --no-pager log --pretty=oneline
```

- `short`: Similar to oneline, but includes the author on a separate line.
```
commit <hash>
Author: <author>

<title-line>
```
```
git --no-pager log --pretty=short
```

- `medium`: Adds date and full commit message, giving slightly more context.
```
commit <hash>
Author: <author>
Date:   <author-date>

<title-line>

<full-commit-message>
```
```
git --no-pager log --pretty=medium
```

- `full`: Adds both author and committer info for a more complete history.
```
commit <hash>
Author: <author>
Commit: <committer>

<title-line>

<full-commit-message>
```
```
git --no-pager log --pretty=full
```

- `fuller`: Most detailed human-readable format. Includes both timestamps and identities.
```
commit <hash>
Author:     <author>
AuthorDate: <author-date>
Commit:     <committer>
CommitDate: <committer-date>

<title-line>

<full-commit-message>
```
```
git --no-pager log --pretty=fuller
```

- `reference`: Designed for referencing commits in other messages. Uses abbreviated hash and short date.
```
<abbrev-hash> (<title-line>, <short-author-date>)
```
```
git --no-pager log --pretty=reference
```

- `email`: Email-style format.
```
From <hash> <date>
From: <author>
Date: <author-date>
Subject: [PATCH] <title-line>

<full-commit-message>
```
```
git --no-pager log --pretty=email
```

- `mboxrd`: Variant of `email` designed to be mbox-safe.
```
From <hash> <date>
From: <author>
Date: <author-date>
Subject: [PATCH] <title-line>

>From quoted lines to avoid confusion
<full-commit-message>
```
```
git --no-pager log --pretty=mboxrd
```

- `raw`: Uses git's internal format
```
tree <hash>
parent <hash>
author <author> <timestamp>
committer <committer> <timestamp>

<full-commit-message>
```
```
git --no-pager log --pretty=raw
```

### Format strings
Basically, a format string is a string, where some special characters are replaced. The git devs basically go:
```py
for log in git_history:
    print(format_string.replace("%H", log.commit_hash).replace("%an", log.authour_name))
```
etc. etc. So for a format string of `"Hello, this commit is %s"`, the result would look like (example):
```
Hello, this commit is Add obj.py
Hello, this commit is Work on obj.py
Hello, this commit is Do some important work on obj.py
Hello, this commit is Fix bug in obj.py
Hello, this commit is Remove useless obj.py
```
(Remember, just add the format string to `git --no-pager log --pretty=format:"..."`, so in this case it would be `git --no-pager log --pretty=format:"Hello, this commit is %s"`)

Here are all the (important) %s you can use: (**bolded** ones are extra important)
| Percentage | What it does |
|------------|--------------|
| `%H` | commit hash |
| `%h` | **abbreviated commit hash** |
| `%an` | **author name** |
| `%ae` | author email |
| `%al` | author email local-part (the part before the @ sign) |
| `%ad` | author date (format respects --date= option) |
| `%as` | **author date, short format (YYYY-MM-DD)** |
| `%ah` | **author date, human style** |
| `%cn` | committer name |
| `%ce` | committer email |
| `%cl` | committer email local-part (the part before the @ sign) |
| `%cd` | committer date (format respects --date= option) |
| `%cs` | committer date, short format (YYYY-MM-DD) |
| `%ch` | committer date, human style |
| `%s` | **subject** |
| `%f` | sanitized subject line, suitable for a filename |
| `%b` | **body** |
| `%B` | raw body (unwrapped subject and body) |
| `%N` | commit notes (if exists) (IS NOT THE SAME AS BODY) |
| `%G?` | signature validity (see [here](https://git-scm.com/docs/pretty-formats#Documentation/pretty-formats.txt-emGem) for more info) |

`%C(<colour>)` changes the colour of the text to the colour specified, or `reset` to reset the colour.

Colours avaliable: `normal`, `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white` and `default`

## How to edit a commit message
Have you ever needed to display every git commit you have made, but are not bothered to copy it into one big file?

(If you just want to put it in a file, see [the above segment](#nice-git-commits) to not have to write everything manually)

You could have a file with every commit and the timestamp and the paragraph explaining what you did...

Or you could go through each git commit and change them.

The following is instructions to change any of your git commit messages to whatever you want.

Here are some important things:
 - Ensure your working directory is clean - i.e. there are no changes left to commit, and everything is pushed to github.
 - If you do stuff something up (or think you did) then just run these commands:
```bash
git fetch origin
git reset --hard origin/master
```
and everything will be reset back to what is currently pushed on github and you can try again!
- **AT THE END DO NOT FORGET TO *FORCE* PUSH**
- **I DO NOT ACCEPT ANY RESPONSIBILITY IF YOU STUFF UP SOMETHING** (but you *shouldn't* stuff anything up if you do everything right, don't worry)

Here are the steps to do that (provided you can use the git command; try typing `git -v` in the terminal to see if you can run this):
1. Open the folder in the terminal through file explorer's right click menu, or use VSCode's terminal. It should have the folder name visible in the terminal, just before the cursor.
2. Run `git rebase -i --root`
3. You should see a text editor pulled up somewhere with all your commits and things next to them (this could be in the terminal depending on git's configuration). That's good. Here is the breakdown of each line:
```
pick <commit hash> <commit name>
```
e.g.
```
pick 885567a Used another API and setup a map viewer for it!
```
(You do not have to know what the commit hash is it isn't important)

If you scroll down it gives you the info about what the 'pick' is for and other commands, but for renaming the commit all you have to know is you need to replace the word 'pick' in each commit you want to change with 'r' or 'reword' e.g.
```
reword 885567a Used another API and setup a map viewer for it!
```
Ensure you don't touch ANYTHING in this file except for the word before the commit hash. As said in the file if it can't find the commit it could DELETE YOUR COMMITS.

4. Exit the text editor (making sure to save if it doesn't autosave)!
5. The terminal will go through to each commit you said to reword and will open a file with the commit name and description. Just edit it and save and exit and it will bring you up to the next commit! Keep going until you have finished and then yay!
6. **VERY VERY IMPORTANT DO NOT FORGET**: Once finished you need to run `git push --force`. THERE IS NO TURNING BACK FROM FORCE PUSHING, but at the same time ***IF YOU DO NOT FORCE PUSH GIT WILL GET VERY MESSED UP.***

If something different happens and you are unsure as to what is going on, the best idea is to reset (see below) and ask someone how to fix it.

Contrary to the excessive 'no turning back' and 'everything will be deleted', if you follow everything here correctly then you'll be fine!
And of course this is totally unnecessary and you could just make a file with every commit. But this is cooler 😎
