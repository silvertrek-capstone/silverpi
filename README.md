# silverpi
A web app portal for Silvertreks customers to view progress on work.
> https://github.com/silvertrek-capstone/silverpi

## Getting Started
There are many steps to getting started, please look through the below steps, and start where you think you need to.


### Install Git Bash
Git bash is a really great terminal for interacting with your system using a unix based system (instead of powershell or cmd, which can be quite different)
- Go to the following link: https://git-scm.com/downloads
- Click "Windows", then, click "Click here to download"
- Run the executable downloaded, and just click next until installed

---

### Install VSCode
VSCode is awesome, and will be what we will be using to do all our development.
- Go to the following link: https://code.visualstudio.com/
- Install for windows
- Run the downloaded file to install

#### Git Bash as default
- In VSCode, hit **CTRL + `** to open the integrated terminal
- The integrated terminal is a sweet way to use the terminal without having to have multiple windows open at once.
- To set to default, open the integrated terminal, and find the chevron down icon, located next to the name of the currently open terminal (likely powershell)
    - Click the arrow, then click "Select default profile"
    - On the drop down, select "Git Bash"
- Use Git Bash for all terminal usage.

---

### Setting up SSH keys
This is need to make changes to the repo without having to enter passwords all the time. It is also useful for other things, like being able to login to servers without passwords

**Do this before cloning the repository**

Skip step 1 if you already have an ssh key with the ed25519 algorithm

1. Run the following (hit enter thrice, no password):
```bash
ssh-keygen -t ed25519
```

2. Run the following, which will copy the public key to your clipboard
```bash
clip < ~/.ssh/id_ed25519.pub
```

3. The following in Github
    - Click your avatar (the icon in the top right)
    - Click "Settings"
    - On the left side, select "SSH and GPG keys"
    - Click "New SSH key"
    - Give it a title, then paste the key in the key field
    - SSH key should now be good to go.


### Clone the repo
- At the repos location (https://github.com/silvertrek-capstone/silverpi)
- Click "Code"
- Select SSH
- Copy the command
- On your PC, create a folder named "silverpi" at a good location
- Open vscode
    - File > Open Folder
    - Go to your newly created directory
    - Hit **CTRL + `** to open the integrated terminal
    - In the terminal, type the following (don't forget the dot): 
    ```bash
    git clone [url] .
    ```
- Repo should now be cloned.

**Quick Initial Setup**

In your terminal, do the following:
```bash
git config user.email [github_email]
```
```bash
git config user.name [github_username]
```
Username is what appears when you click your icon in Github

- Create a branch with named "[name]_initial" (see git commands below for how)
- Add your name to the "contributors" tab at the bottom, and commit and push to your branch, then create a Pull request and get it merged (this will be your first commit)

### Git Commands / Handling branches
There are a lot of git commands, but here most of them that you will for handling branches

**Creating branches**
```bash
git checkout -b [branch_name] origin/main
```
Note: the origin/main at the end is what the new branch will be based on, if you do not do this, the changes of the branch you were on will be moved over to the new branch

**Checking out a branch**
```bash
git checkout [branch_name]
```

**Getting data from remote**

This should be done before you begin coding, it is essential when working on a repo that is having active development by multiple people
```bash
git fetch --all
```

Note: This does not change your current branch, just brings the remote code on github to your local machine.

**Merging Main into your branch**

When working on projects with multiple people, it is important to always be working with the most recent changes, to avoid issues with conflicts.

This should also be done before you begin a coding session.
```bash
git merge origin/main
```

Note: This *will* modify your current branch, and may result in conflicts if working on code other developers worked on.

**Making changes**

Staging is the middle ground between untracked and commited, use the vscode git integration for a visual view of the files being staged/comitted/changed

Staging all
```bash
git add -A
```
Staging specific files, done in case you have changes you don't want commited
```bash
git add [regex matching files]
```
ie: `git add *.c`

Commiting
```bash
git commit -m "a wonderful commit message describing changes made"
```

Pushing
```bash
git push origin [branch_name]
```
if there are errors pushing, fetch & then merge all changes.

**Pull requests**

After pushing your code up, go to Github
- Click pull requests
- Click "New Pull Request"
- Select your branch name on the "compare" side
- Click "Create pull request:

Pull request should be approved by a team member before being merged

Code should be reviewed, don't just blindly approve and merge.


### Branch Rules
When creating a new branch, the name should be named in the following format:
```
silver_[id]
```
ID is the number found in the url when the trello card is open

In your branch, drop a link to the related trello card
```
> https://trello.com/c/pHPgtwqs/trello-card-id
```

In the trello card, put a link to the related pull request
```
> https://github.com/silvertrek-capstone/silverpi/pull/pr-id
```

After a pull request is merged, delete the old branch. (The pull request can still be viewed, but we don't want remote branches taking up room)

---

## Contributors
Below are the people who have worked on this project.

- Judah Tanninen
- Muhamad Al-zughir
- Shawyan Tabari
- Joe Hernandez Lopez
- Alexandr Kochenkov