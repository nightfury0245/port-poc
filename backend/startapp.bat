cd "C:\Users\DHEERAJ\Port-POC\backend"
start cmd /k "portApiVenv\\scripts\\activate.bat && python api.py startapi" 
start cmd /k "portApiVenv\\scripts\\activate.bat && python simulation.py startSimuator" 
start cmd /k "cd /d C:\Users\DHEERAJ\Port-POC\website && npm start"