---
title: "Commit Suggestions"
date: "2025-13-10"
excerpt: "Using AI to create git commit suggestions"
---


# Dev Log 1: I can't commit!
I'm really bad at remembering to commit throughout the development process. Usually what happens is, I make a feature in a code base and end up fixing bugs. It's not until after I've finished my coding session and I'm winding down that I realize I completely forgot to commit changes along the way to document the process. Moreover, by the end of the session, I feel like I don't have the mental acuity to write clear and concise messages.

So, rather than setting timers, dividing my work, or forming better habits, I spent a few days to automate the task for me (in true programmer fashion)!

## The Project Plan
The execution flow is pretty simple:

![commit-suggestions-plan](commit-suggestions-plan.png)

The program is divided into two parts:
* **Generating Suggestions**: where I parse the `git diff` command to get changes in the code-base from my most recent commit and then feed them to ChatGPT to get commit suggestions.
* **Suggesting Commit Suggestions**: where I show the user the suggested commit messages returned by ChatGPT along with the code snippets so they know what is being committed. They can either refuse or accept the suggested commit messages.

### Parsing Git Diffs
This was my first conflict in the project. I went into it knowing that I would be able to parse the `git diff` command, but I assumed there was some library would do it for me already. Instead, I had to make my own function that parses `git diff` output and puts it into a format that I was comfortable sending to ChatGPT.

So, per git terminology, I parsed the output into Hunks (which I represented as pydantic BaseModel). The result is something like this:

PICTURE OF GIT DIFF OUTPUT

PICTURE OF CREATED HUNK OBJECT

There's a lot to be desired in the parsing function. Although I wrote some tests with examples of `git diff`, there are still definitely `git diff` output that will crash the program. This is something that I plan to keep working on as I use the tool.

### Prompting LLM
Fair warning, this was my first time using an OpenAI model (specifically, I used gp4-o), so there may be solutions not yet explored.

At first, I tried prompting the LLM for commit suggestions by just feeding it the JSON version of the Hunk objects (i.e. I gave it the snippets of modified code). This didn't work too well and so I quickly realized I was going to have to work on the prompt that I give it.

I ended up this:

PROMPT

It seems like very clearing stating input and output helped the LLM a lot and so far has worked fine.

Moreover, I was able to use one of Open-AI's new API features called `structured_output` which basically made the LLM model query function return a pydantic model. All I had to do was feed it the class.

### Showing the user Commit Suggestions
With my output in hand, I could start working on showing the user the commit suggestions. At first, I was just going to show the commit message, but I quickly realized that it would also be useful to show the code snippets that would be included in a commit.

I ended up using the rich library to make the output and what I ended up with is this:

PICTURES OF OUTPUT AND PROCESS.

## Reflection
To be honest, I wasn't sure if I would be able to finish this project; it came to me in a burst of creativity and I clung to it because I needed a break from a larger project. I'm pretty happy with the current result -- even if it is just a proof of concept.

More importantly, I got to play around with Open-AI's API which I think will be useful for any other future ideas.

If people actually like this and think it could be worth something, I would definitely be interested in continuing the project. At the least, it needs more tests, but more importantly, right now it only creates suggestions for modified code which means adding/removing files aren't recognized by the script.

Besides the point, if you like the project and want to see it continued, leave a star on the repository!

And if you have any question feel free to email me at: tyler73750@gmail.com
