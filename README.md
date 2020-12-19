# OutrightShop

* Install npm, nodejs, yarn and postgresdb before deployment, all installation instructions are available online!

* Setup Ruby version 2.7.2 for project on the Linux OS:
    1. [Installation instructions Ruby 2.7.2](https://www.techiediaries.com/install-ruby-2-7-rails-6-ubuntu-20-04/).
    2. *RubyMine* guide: Settings -> Language & Frameworks -> RubySDK and Gems. Choose rbenv: 2.7.2.

* Install gems
    ```bash
     bundle install
     ```
  
* Database creation and configuration
    ##### Installing PostgreSQL
     ```bash
     sudo apt update
     sudo apt install postgresql postgresql-contrib
     sudo apt-get install libpq-dev
     ```
    ##### Switching to PostgreSQL account
     ```bash
     sudo -u postgres psql postgres
     ```
    ##### Change PostgreSQL user (postgres) password (password = yo-ruby)
    ```bash
    \password postgres
    ```
    ##### Create database for user (postgres)
     ```bash
     CREATE DATABASE postgresdb OWNER postgres;
     ```
    ##### Create db migration
    ```bash
    rails generate devise:install
    rails db:migrate
    ```
    *Solution of abort in rails generate devise:install.*
        I think there is devise_for :installs in your route.rb file and you should comment it out. Then you should try to rerun rails generate devise:install and uncomment route after.
    
    *Solution of PG::UndefinedTable: ERROR:  relation "users" does not exist*
    1. Delete file from migrate/20201212060305_add_role_to_users.rb (Copy this file anywhere!)
    2. Start migrate
    ```bash
        rails db:migrate
    ```
    And restore 20201212060305_add_role_to_users.rb in migrate folder and start migrate again
    ```bash
        rails db:migrate
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
    4. Restart service
        ```bash
        sudo service postgresql restart
        ```
* Frontend configuration
    ```bash
    npm install
    ```
  If it does not work, refer to the instructions on the [link](https://stackoverflow.com/questions/46013544/yarn-install-command-error-no-such-file-or-directory-install)
  ```bash
  yarn install
  ```
  
* Test application
    ```bash
    rails s
    rspec
    ```
  
