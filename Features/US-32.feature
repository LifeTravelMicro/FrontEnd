Scenario: La agencia de viajes registra un transport con información válida 
Given que la agencia de viajes está en el panel de administración 
When el usuario hace clic en "lifetravelapp/api/v1/transports"  
And llena los campos con información válida
And haga clic en "POST" 
Then se creará un transport en la base de datos con la información proporcionada 

Scenario: La agencia de viajes registra un transport con información inválida 
Given que la agencia de viajes está en el panel de administración  
When el usuario hace clic en "lifetravelapp/api/v1/transports"  
And llena los campos con información inválida 
And haga clic en "POST" 
Then se mostrará un error con el validation

Scenario:La agencia de viajes modifica un transport con información válida 
Given que la agencia de viajes está en el panel de administración   
When coloque el id del transport a modificar
And este sea correcto
And llene los campos con informacion valida
And haga clic en "PUT" 
Then el transport seleccionado se actualizará en la base de datos con la información brindada 

Scenario: La agencia de viajes modifica un transport con información inválida 
Given que la agencia de viajes está en el panel de administración   
When coloque el id del transport a modificar
And este sea incorrecto
And llene los campos con informacion invalida
And haga clic en "PUT" 
Then se mostrara un error con el validator

Scenario: La agencia de viajes elimina un transport de manera correcta
Given  que la agencia de viajes está en el panel de administración  
When coloque el id del transport a eliminar 
And haga clic en "DELETE"  
Then el transport seleccionado será eliminado 

Scenario: La agencia de viajes elimina un transport de manera incorrecta
Given  que la agencia de viajes está en el panel de administración  
When coloque el id de forma incorrecta del transport a eliminar 
And haga clic en "DELETE"  
Then se mostrara un error con el validatora 
