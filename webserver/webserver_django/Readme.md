# Running Django Code with PostgreSQL Database: A Comprehensive Guide

## Introduction
Running Django code involves several steps, from setting up a virtual environment to installing dependencies and executing Django-specific commands. This document provides a step-by-step guide on how to run a Django project, covering the creation of a virtual environment, installing dependencies, and executing essential Django commands. Additionally, it includes instructions on installing PostgreSQL, creating a PostgreSQL database, and configuring Django settings to use PostgreSQL. It also covers how to manage environment variables using a `.env` file.

### 1. Creating a Virtual Environment
A virtual environment is a self-contained directory that houses a Python installation for a particular version of Python, plus a number of additional packages. This ensures that your project dependencies are isolated from the system-wide packages. We'll use `venv`, a built-in Python module, to create a virtual environment.

#### Creating a Virtual Environment using `venv`:
Navigate to your project directory and execute the following command in your terminal or command prompt:

```bash
python3 -m venv myenv
```

Replace `myenv` with the name you want to give to your virtual environment. This command will create a new directory named `myenv` which will contain the virtual environment.

#### Activating the Virtual Environment:
Once the virtual environment is created, you need to activate it before installing any packages or running your Django project. The activation process varies slightly between operating systems.

##### On Windows:
```bash
.\myenv\Scripts\activate
```

##### On macOS and Linux:
```bash
source myenv/bin/activate
```

### 2. Installing Dependencies
Once the virtual environment is activated, you can install the necessary dependencies for your Django project. Typically, these dependencies are listed in a `requirements.txt` file.

#### Installing Dependencies from `requirements.txt`:
Navigate to your project directory (where `requirements.txt` is located) and execute the following command:

```bash
pip install -r requirements.txt
```

This command will install all the packages listed in `requirements.txt` into your virtual environment.

### 3. Installing PostgreSQL
Before creating a PostgreSQL database, you need to install PostgreSQL on your local machine. Follow the steps below based on your operating system.

#### Installing PostgreSQL on Windows:
1. Download the PostgreSQL installer from the official website: [PostgreSQL Downloads](https://www.postgresql.org/download/)
2. Run the installer and follow the installation wizard.
3. During installation, you will be prompted to set a password for the default `postgres` user. Remember this password as you'll need it later.

#### Installing PostgreSQL on macOS:
1. PostgreSQL can be installed on macOS using Homebrew. If Homebrew is not installed, follow the instructions on the [Homebrew website](https://brew.sh/) to install it.
2. Once Homebrew is installed, run the following command in the terminal:
   ```bash
   brew install postgresql
   ```

#### Installing PostgreSQL on Linux:
PostgreSQL can be installed on various Linux distributions using the package manager. For example, on Ubuntu, you can use `apt`:

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

### 4. Creating a PostgreSQL Database
After installing PostgreSQL, you need to create a database for your Django project. We'll create a database named `famsketch`.

#### Creating a Database:
1. Open a terminal or command prompt.
2. Log in to the PostgreSQL interactive terminal as the `postgres` user:
   ```bash
   psql -U postgres
   ```
3. Enter the password you set during PostgreSQL installation.
4. Once logged in, create a new database by running the following SQL command:
   ```sql
   CREATE DATABASE famsketch;
   ```
5. You can exit the PostgreSQL interactive terminal by typing:
   ```sql
   \q
   ```

### 5. Configuring Django to Use PostgreSQL
After creating the PostgreSQL database, you need to configure your Django project to use it.

#### Editing `.env` File:
1. In your Django project directory, create a new file named `.env`.
2. Open the `.env` file in a text editor.
3. Add the following lines to the `.env` file, replacing `your_postgres_username` and `your_postgres_password` with your PostgreSQL username and password respectively:
   ```
   DB_NAME=famsketch
   DB_USER=your_postgres_username
   DB_PASSWORD=your_postgres_password
   DB_HOST=localhost
   DB_PORT=5432
   ```
4. Save and close the `.env` file.

### 6. Running Django Commands
Now that your PostgreSQL database is set up and your Django project is configured to use it, you can proceed with running Django commands.

#### Making Migrations:
```bash
python manage.py makemigrations
```

#### Applying Migrations:
```bash
python manage.py migrate
```

#### Running the Development Server:
```bash
python manage.py runserver
```

By following these steps, you should now be able to run your Django project with a PostgreSQL database configured locally on your machine. This setup ensures efficient management of your project's data using PostgreSQL.