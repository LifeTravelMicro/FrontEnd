Scenario: El administrador registra un agency con información válida   
Given que administradorestá en el panel de administración 
When el usuario hace clic en "lifetravelapp/api/v1/agencies"  
And llena los campos con información válida
And haga clic en "POST" 
Then se creará un agency en la base de datos con la información proporcionada 

Scenario: El administrador registra un agency con información inválida 
Given que administradorestá en el panel de administración  
When el usuario hace clic en "lifetravelapp/api/v1/agencies"  
And llena los campos con información inválida 
And haga clic en "POST" 
Then se mostrará un error con el validation

Scenario:El administrador modifica un agency con información válida 
Given que administradorestá en el panel de administración   
When coloque el id del agency a modificar
And este sea correcto
And llene los campos con informacion valida
And haga clic en "PUT" 
Then el agency seleccionado se actualizará en la base de datos con la información brindada 

Scenario: El administrador modifica un agency con información inválida 
Given que administradorestá en el panel de administración   
When coloque el id del agency a modificar
And este sea incorrecto
And llene los campos con informacion invalida
And haga clic en "PUT" 
Then se mostrara un error con el validatora 

Scenario: El administrador elimina un agency de manera correcta
Given  que administradorestá en el panel de administración  
When coloque el id del agency a eliminar 
And haga clic en "DELTE"  
Then el agency seleccionado será eliminado 

Scenario:El administrador elimina un agency de manera incorrecta
Given  que administradorestá en el panel de administración  
When coloque el id de forma incorrecta del agency a eliminar 
And haga clic en "DELETE"  
Then se mostrara un error con el validatora 
