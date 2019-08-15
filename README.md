# favorite-things

##### Table of Contents
[Scripts](#scripts)
[Coding Test Deliverables](#coding-test-deliverables)


<a name="scripts"/>

## Scripts

### Clone repository
```bash
foo@bar:~$ git clone https://github.com/EmilianoSanchez/favorite-things.git
foo@bar:~$ cd favorite-things/backend/
```

### Create and activate python environment
Prerequisites:
- Python +3.6
- pip
- virtualenv

1. Create virtual environment:
    ```bash
    foo@bar:~/favorite-things/backend$ virtualenv ~/virtenv
    ```

2. Activate virtual environment:
    ```bash
    foo@bar:~/favorite-things/backend$ source ~/virtenv/bin/activate
    ```

3. Install dependencies:
    ```bash
    (virtenv)foo@bar:~/favorite-things/backend$ pip install -r requirements.txt
    ```

<a name="run-project-in-local-server"/>

### Run project in local server

```bash
(virtenv)foo@bar:~/favorite-things/backend$ python manage.py migrate
(virtenv)foo@bar:~/favorite-things/backend$ python manage.py loaddata fixtures/fixture.json
(virtenv)foo@bar:~/favorite-things/backend$ python manage.py runserver
```

### Run tests with code coverage
Prerequisites:
- [coverage.py](https://pypi.org/project/coverage/)

```bash
(virtenv)foo@bar:~/favorite-things/backend$ coverage run --source='.' manage.py test restapi
(virtenv)foo@bar:~/favorite-things/backend$ coverage report
```

<a name="run-project-with-docker"/>

### Run project with Docker

Prerequisites:
- docker

```bash
foo@bar:~/favorite-things/backend$ docker-compose up
```

<a name="deploy-project-in-aws-elastic-beanstalk"/>

### Deploy project in AWS Elastic BeanStalk (EB) with a RDS PostgreSQL instance

Prerequisites:
- awsebcli

1. Initialize your EB CLI repository with the eb init command:
    ```bash
    foo@bar:~/favorite-things/backend$ eb init -p python-3.6 django-project
    ```

2. Create an EB environment with eb create:
    ```bash
    foo@bar:~/favorite-things/backend$ eb create django-env
    ```

3. When the environment creation process completes, find the domain name of your new environment by running eb status:
    ```bash
    foo@bar:~/favorite-things/backend$ eb status
    Environment details for: django-env
      Application name: django-project
      ...
      CNAME: eb-django-app-dev.elasticbeanstalk.com
      ...
    ```
    Your environment's domain name is the value of the CNAME property.

4. Edit the _settings.py_ file in the _/favorite-things/backend/ebdjango/_ directory, locate the ALLOWED_HOSTS setting, and then add your application's domain name that you found in the previous step to the setting's value.
    ```python
    ...
    ALLOWED_HOSTS = ['eb-django-app-dev.elasticbeanstalk.com']
    ```
5. [Add an Amazon RDS PostgreSQL Instance to Your EB Environment](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create-deploy-python-rds.html).

    - Open the Elastic Beanstalk console.
    - Navigate to the management page for your environment.
    - Choose Configuration.
    - In the Database configuration category, choose Modify.
    - Choose a postgree DB engine, and enter a user name and password.
    - Choose Apply.

6. Add a production environment variable for DJANGO_SECRET_KEY.

    - Open the Elastic Beanstalk console.
    - Navigate to the management page for your environment.
    - Choose Configuration.
    - In the Software configuration category, choose Modify.
    - Add a new environment variable with name DJANGO_SECRET_KEY and a randomly generate value.
    - Choose Apply.

6. Commit the change, and deploy your application by running eb deploy
    ```bash
    foo@bar:~/favorite-things/backend$ git add ebdjango/settings.py
    foo@bar:~/favorite-things/backend$ git commit -m "Update domain name"
    foo@bar:~/favorite-things/backend$ eb deploy
    ```

7. Open your web site with eb open
    ```bash
    foo@bar:~/favorite-things/backend$ eb open
    ```

<a name="coding-test-deliverables"/>

## Coding Test Deliverables

This section explains the design and deployment methods of the coding test project, in five separate subsections.
The first subsection presents the repository structure and describes its main files and folders. This repository contains a Django project and additional README files required by the coding test.
The second subsection describes an entity relationship diagram that represents the domain models of the coding test.
The third subsection briefly describes the REST API that exposes these models, and how it was tested.
The fourth subsection describes the deployment methods: in a local server for development and testing, and in AWS for production.
The last subsection ilustrates the frontend of the app, a Single Page App build with ReactJS and delivered as part of the Django project.


### 1. Repository and code structure
```
favorite-things/
├── .gitignore
├── README.md
├── answers.md
├── myself.json
├── quiz.py
└── backend/
    ├── package.json
    ├── webpack.config.js
    ├── requirements.txt
    ├── manage.py
    ├── ebdjango/
    ├── restapi/
    │   ├── ...
    │   └── models.py
    ├── frontend/
    ├── static/
    └── fixtures/
```

- **backend/**: root directory of the Django project
- **backend/ebdjango/**: Django project configuration files
- **backend/restapi/**: Django app that implements the domain models and the REST API. The API URL is ``` localhost:8000/api/```.
- **backend/frontend/**: Django app that implements a Single Page App which consumes the Web API. The SPA is accessed through the root path (``` localhost:8000/``` )
- **backend/static/**: static content
- **backend/fixtures/**: fixture for providing initial data to the database

### 2. Entity relationship diagram

The following diagram depicts the 5 tables that represent the required data to track:

![ER Diagram](/docs/er-diagram.png)

- **category**: this table represents the categories to which favorite things may belong.
- **favoritething**: it represents the favorite things objects that users want to create, edit, delete and track.
- **metadata**: it represents the metadata key/value entries that can be associated to favorite things.<br />
  Besides the key and value attributes, metadata entries must have a **type** attribute that represents and enforces the data type of **value** attributes.
  The **type** attribute must be one of the following values: _Text_, _Number_, _Date_, and _Enum_.<br />
  If the **type** attribute is set to _Enum_, the **Enum** attribute of the table must reference an Enum entry from table **enum**.
- **enum**: it represents the possible enumeration types of metadata entries.
  It consists of a **name** and a **values** attributes. The **values** attribute must be a comma-separated list of values, such as "Value1,Value2,Value3", that represents the set of named values of the enum.
- **auditlog_logentry**: the entries of this table represent the recorded changes to data on the previous 4 tables. The tracked changes (**action** attribute) are: creation of objects (SQL INSERT), edition of objects (SQL UPDATE), and deletion of objects (SQL DELETE).<br />
  This table and its logic is implemented in the app [django-auditlog](https://github.com/jjkester/django-auditlog).

### 3. REST API written with Django REST framework

Browsable REST API implemented using Django REST Framework.

The API exposes the 5 models through the following endpoints:
- Categories, at:           ``` localhost:8000/api/categories/ ```
- Favorite things, at:      ``` localhost:8000/api/favorite-things/ ```
- Metadata entries, at:     ``` localhost:8000/api/metadatas/ ```
- Enum types, at:           ``` localhost:8000/api/enums/ ```
- Audit log entries, at:    ``` localhost:8000/api/log-entries/ ```

Test cases are located in the source _/favorite-things/backend/restapi/tests.py_
and can be run with the following command:
```bash
(virtenv)foo@bar:~/favorite-things/backend$ python manage.py test restapi
```
The tests were performed with helper classes provided by Django REST Framework, such as APITestCase and APIClient.

### 4. Deployed version of the project

The project can be run locally using the Django development server ([Run project in local server](#run-project-in-local-server)) or using Docker ([Run project with Docker](#run-project-with-docker)).

The project was also deployed using AWS Elastic BeanStalk with a PostgreSQL instance ([Deploy project in AWS Elastic BeanStalk](#deploy-project-in-aws-elastic-beanstalk)).

URL: http://django-env.papkc68gam.us-west-2.elasticbeanstalk.com/

### 5. Frontend

A Single Page App was implemented using ReactJS, Redux and WebPack.

The main routes of the app are illustrated below:

- List favorite things (``` localhost:8000/index.html ```)

![list-favoritethings](/docs/list-favoritethings.png)

- Edit a favorite thing (``` localhost:8000/favorite-things/edit/{id} ```)

![edit-favoritething](/docs/edit-favoritething.png)

- Add a new metadata entry (``` localhost:8000/favorite-things/edit/{id}/metadata/new ```)

![add-metadata](/docs/add-metadata.png)

- Add a new enum type (``` localhost:8000/favorite-things/enums/new ```)

![add-enum](/docs/add-enum.png)

- List audit logs (``` localhost:8000/audit-log ```)

![list-auditlogs](/docs/list-auditlogs.png)
