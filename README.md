# silverpi
A web app portal for Silvertreks customers to view progress on work.
> https://github.com/silvertrek-capstone/silverpi

## Getting Started

### Before running
1. `cd silverpi`
2. Run the following to install all packages
```bash
npm ci
```
3. Create a file called .env.local, copied from .env.local.dev
```bash
cp .env.local.dev .env.local
```
4. Replace the variables inside with actual values.

### Running
For development, just run the following
```bash
npm run dev
```

The react app will then be available at http://localhost:3000


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

## Downloading and Installing Postman
### Downloading Postman:

Visit Postman's official website.
Choose the appropriate version for your operating system (Windows or Linux) and download it.

### Installing Postman:

Windows: Run the installer (.exe file) and follow the on-screen instructions.

Linux: Open the terminal and navigate to the directory where the installer is downloaded. Run the install command specific to your package manager (usually just apt-get for most people).

### Launching Postman:

Once installed, launch the application. Alternatively , you can use the online environment as well.

### Setting Up Account:

You'll be prompted to log in or create an account. You should create one, as this will be needed for sync collections and environments.


## Contributors
Below are the people who have worked on this project.

- Judah Tanninen
- Muhamad Al-zughir
- Shawyan Tabari
- Joe Hernandez Lopez
- Alexandr Kochenkov