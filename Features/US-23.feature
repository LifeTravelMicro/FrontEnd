Scenario: El administrador registra un traveler con información válida   
Given que administradorestá en el panel de administración 
When el usuario hace clic en "lifetravelapp/api/v1/tavelers"  
And llena los campos con información válida
And haga clic en "POST" 
Then se creará un traveler en la base de datos con la información proporcionada 

Scenario: El administrador registra un traveler con información inválida 
Given que administradorestá en el panel de administración  
When el usuario hace clic en "lifetravelapp/api/v1/travelers"  
And llena los campos con información inválida 
And haga clic en "POST" 
Then se mostrará un error con el validation

Scenario:El administrador modifica un traveler con información válida 
Given que administradorestá en el panel de administración   
When coloque el id del traveler a modificar
And este sea correcto
And llene los campos con informacion valida
And haga clic en "PUT" 
Then el traveler seleccionado se actualizará en la base de datos con la información brindada 

Scenario: El administrador modifica un traveler con información inválida 
Given que administradorestá en el panel de administración   
When coloque el id del traveler a modificar
And este sea incorrecto
And llene los campos con informacion invalida
And haga clic en "PUT" 
Then se mostrara un error con el validatora 

Scenario: El administrador elimina un traveler de manera correcta
Given  que administradorestá en el panel de administración  
When coloque el id del traveler a eliminar 
And haga clic en "DELTE"  
Then el traveler seleccionado será eliminado 

Scenario:El administrador elimina un traveler de manera incorrecta
Given  que administradorestá en el panel de administración  
When coloque el id de forma incorrecta del traveler a eliminar 
And haga clic en "DELETE"  
Then se mostrara un error con el validatora 
