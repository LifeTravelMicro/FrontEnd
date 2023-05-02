Scenario: El viajero registra un review con información válida   
Given que viajeroestá en el panel de administración 
When el usuario hace clic en "lifetravelapp/api/v1/reviews"  
And llena los campos con información válida
And haga clic en "POST" 
Then se creará un review en la base de datos con la información proporcionada 

Scenario: El viajero registra un review con información inválida 
Given que viajeroestá en el panel de administración  
When el usuario hace clic en "lifetravelapp/api/v1/reviews"  
And llena los campos con información inválida 
And haga clic en "POST" 
Then se mostrará un error con el validation

Scenario:El viajero modifica un review con información válida 
Given que viajeroestá en el panel de administración   
When coloque el id del review a modificar
And este sea correcto
And llene los campos con informacion valida
And haga clic en "PUT" 
Then el review seleccionado se actualizará en la base de datos con la información brindada 

Scenario: El viajero modifica un review con información inválida 
Given que viajeroestá en el panel de administración   
When coloque el id del review a modificar
And este sea incorrecto
And llene los campos con informacion invalida
And haga clic en "PUT" 
Then se mostrara un error con el validatora 

Scenario: El viajero elimina un review de manera correcta
Given  que viajeroestá en el panel de administración  
When coloque el id del review a eliminar 
And haga clic en "DELTE"  
Then el review seleccionado será eliminado 

Scenario:El viajero elimina un review de manera incorrecta
Given  que viajeroestá en el panel de administración  
When coloque el id de forma incorrecta del review a eliminar 
And haga clic en "DELETE"  
Then se mostrara un error con el validatora 
