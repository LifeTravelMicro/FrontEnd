Scenario: La agencia de viajes registra un plan con información válida 
Given que la agencia de viajes está en el panel de administración 
When el usuario hace clic en "Planes"  
And llena los campos con información válida
And haga clic en "Add" 
Then se creará un plan en la base de datos con la información proporcionada 

Scenario: La agencia de viajes registra un plan con información inválida 
Given que la agencia de viajes está en el panel de administración  
When el usuario hace clic en "Planes"  
And llena los campos con información inválida 
And haga clic en "Add" 
Then se resaltarán los campos con información no válida 

Scenario:La agencia de viajes modifica un plan con información válida 
Given que la agencia de viajes está en el panel de administración   
When hace clic en un plan  
And haga clic en "Modificar"
And aparece un formulario de modificación con los datos actuales del plan
And llena los campos con información válida 
And haga clic en "Modificar" 
Then el plan seleccionado se actualizará en la base de datos con la información brindada 

Scenario: La agencia de viajes modifica un plan con información inválida 
Given que la agencia de viajes está en el panel de administración   
When hace clic en un plan  
And haga clic en "Modificar"
And aparece un formulario de modificación con los datos actuales del plan
And llena los campos con información inválida 
And haga clic en "Modificar" 
Then se resaltarán los campos con información no válida

Scenario: La agencia de viajes elimina un plan
Given  que la agencia de viajes está en el panel de administración  
When hace clic en un plan 
And haga clic en "Eliminar"  
Then el plan seleccionado será eliminado 
