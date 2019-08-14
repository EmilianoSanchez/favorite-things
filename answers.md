# Technical Questions 

 1) How long did you spend on the coding test below? What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.
    
    I spent around 20 hours. I took an extra time in order to implement a Single Page App with ReactJS, and provide a test suite with a coverage of 100%. 
    With additional time, I would have worked on other bonus points as: 
    - using VueJS instead of ReactJS as a Single Page App
    - host the app in AWS Lambda using Zappa or AWS ECS using AWS Fargate
        
 2) What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.
 
    The most used feature that was added to the version of Python used in this project (3.6) is [_Formatted string literals_](https://docs.python.org/3/whatsnew/3.6.html#pep-498-formatted-string-literals). 
    
    Examples:
    ```python
    def __str__(self):
        return f"Enum '{self.name}'"    
    def __str__(self):
        return f"Metadata '{self.key}' from Favorite Thing '{self.favorite_thing.title}'"
    ```
        
 3) How would you track down a performance issue in production? Have you ever had to do this?
 
    I would rely on monitoring and profiling tools (such as Amazon Cloud Watch), in order to:
    
    - Know when performance issues appears. For example, defining alerts whenever critical components fail or their performance degrade.
    - Have sufficient context to figure out what was going wrong when they were slow and identify the bottlenecks. 
      The key for this is to have proper performance logs for the different components of our architecture, such as, databases, application servers, Api gateways, etc.
    - Resolve the bottlenecks. It can imply to fix or optimize the implementation of a particular component, 
      or adapt the system to a more scalable architecture, with strategies such as load balancing, caching, data partitioning, proxies and queues.  
    
    I had some experience tracking down performance issues on an API gateway called Apigee, for which I worked providing support for clients of this product. 
    Besides the basic monitoring features, this software allowed to trace the traffic (HTTP transactions) in production in more detail for a short period of time, to not downgrade the system performance. 
    The logs of these traces included many performance details, such as the timestamps in the different steps of the processing.
    With these timestamps we could identify which steps were taking to much time to compute, and then we could analyse it and provide a fix or optimization.   
    
    Other method I used for detecting performance issues before deploying to production was running performance/stress tests on an Apigee testing environment. 
    The most used tool for this purpose was Apache JMeter.