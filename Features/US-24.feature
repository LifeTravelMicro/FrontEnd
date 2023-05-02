Scenario: El agente de viaje  registra un plan con información válida   
Given que agente de viaje está en el panel de administración 
When el usuario hace clic en "lifetravelapp/api/v1/plans"  
And llena los campos con información válida
And haga clic en "POST" 
Then se creará un plan en la base de datos con la información proporcionada 

Scenario: El agente de viaje  registra un plan con información inválida 
Given que agente de viaje está en el panel de administración  
When el usuario hace clic en "lifetravelapp/api/v1/plans"  
And llena los campos con información inválida 
And haga clic en "POST" 
Then se mostrará un error con el validation

Scenario:El agente de viaje  modifica un plan con información válida 
Given que agente de viaje está en el panel de administración   
When coloque el id del plan a modificar
And este sea correcto
And llene los campos con informacion valida
And haga clic en "PUT" 
Then el plan seleccionado se actualizará en la base de datos con la información brindada 

Scenario: El agente de viaje  modifica un plan con información inválida 
Given que agente de viaje está en el panel de administración   
When coloque el id del plan a modificar
And este sea incorrecto
And llene los campos con informacion invalida
And haga clic en "PUT" 
Then se mostrara un error con el validatora 

Scenario: El agente de viaje  elimina un plan de manera correcta
Given  que agente de viaje está en el panel de administración  
When coloque el id del plan a eliminar 
And haga clic en "DELTE"  
Then el plan seleccionado será eliminado 

Scenario:El agente de viaje  elimina un plan de manera incorrecta
Given  que agente de viaje está en el panel de administración  
When coloque el id de forma incorrecta del plan a eliminar 
And haga clic en "DELETE"  
Then se mostrara un error con el validatora 
