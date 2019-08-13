# favorite-things

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

### Run project in local server
```bash
(virtenv)foo@bar:~/favorite-things/backend$ python manage.py migrate
(virtenv)foo@bar:~/favorite-things/backend$ python manage.py runserver

```

### Run tests with code coverage
Prerequisites:
- [coverage.py](https://pypi.org/project/coverage/)

```bash
(virtenv)foo@bar:~/favorite-things/backend$ coverage run --source='.' manage.py test restapi
(virtenv)foo@bar:~/favorite-things/backend$ coverage report
```

### Deploy project in AWS Elastic BeanStalk (EB) with a RDS MySQL instance 

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
5. [Add an Amazon RDS MySQL Instance to Your EB Environment](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/python-development-environment.html).

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