# Web Development 1 – SoSe 2018

## calculator.js

Use the "calculator.js" file to calculate simple formulas.

**Single Argument:** *node calculator 10+728* </br>
**Multiple Arguments:** *node calculator 22 x 0.5*

---

## tcp_server.js

Start the tcp server with the "tcp_server.js" file using one of the two commands: </br>
"*node tcp_server*" or "*npm start*". Then navigate to the following URLs to preform </br> the desired request. 

**localhost:80** - viewing visitor count (GET) </br>
**localhost:80/visit** - incrementing visitor count (GET)</br>

**localhost:80/?counter=\<number\>** - setting the visitor count to a specific value (POST)

*(The visitor count is stored in the "tcp_server.json" file)*