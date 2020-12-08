# OutrightShop

* Setup Ruby version 2.7.2 for project on the Linux OS:
    1. [Installation instructions Ruby 2.7.2](https://www.techiediaries.com/install-ruby-2-7-rails-6-ubuntu-20-04/).
    2. *RubyMine* guide: Settings -> Language & Frameworks -> RubySDK and Gems. Choose rbenv: 2.7.2.
    
* System dependencies
    ```bash
    sudo apt install npm
    npm install
    ```
  
* Database creation and configuration
    ##### Installing PostgreSQL
     ```bash
     sudo apt update
     sudo apt install postgresql postgresql-contrib
     ```
    ##### Switching to PostgreSQL account
     ```bash
     sudo -u postgres psql postgres
     ```
    ##### Change PostgreSQL user (postgres) password
    ```bash
    \password postgres
    ```
    ##### Create database for user (postgres)
     ```bash
     CREATE DATABASE postgresdb OWNER postgres;
     ```
    
    *Solution of psql: FATAL: Peer authentication failed for user “postgres” (or any user)*
     ##### Update ‘pg_hba.conf’ file
     1. *Locate the pg_hba.conf (copy this path and run the next command)*
        ```bash
        locate pg_hba.conf
        ```
    2. *Open the pg_hba.conf*
        ```bash
        sudo nano /etc/postgresql/.../pg_hba.conf
        ```
    3. *This will open ‘pg_hba.conf’ in nano editor. Now locate this line in the file and scrolling down*
        ```bash
        local   all             postgres                            peer
        ```
        and replace it with:
        ```bash
        local   all             postgres                              md5
        ```
* Frontend configuration
    ```bash
    bin/rails webpacker:install
    ```
  or 
  ```bash
  rails webpacker:install:[react, angular or vue] (optional)
  ```
  
* Test application
    ```bash
    rails s
    rspec
    ```
  