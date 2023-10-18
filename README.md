# silverpi
A web app portal for Silvertreks customers to view progress on work.
> https://github.com/silvertrek-capstone/silverpi

## Initial Setup

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


### Cloning the repo
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

---

## Contributors
Below are the people who have worked on this project.

- Judah Tanninen
- Muhamad Al-zughir
- Shawyan Tabari
- Joe Hernandez Lopez
- Alexandr Kochenkov