Scenario: El administrador registra a un usuario viajero con información válida 
Given que el usuario está en el panel de administración 
When el usuario hace clic en "Travelers" 
And llena los campos con información válida
And haga clic en "Add" 
Then se creará un usuario viajero en la base de datos con la información proporcionada 

Scenario: El administrador registra a un usuario viajero con información inválida 
Given que el usuario está en el panel de administración 
When el usuario hace clic en "Travelers" 
And llena los campos con información inválida 
And haga clic en "Add" 
Then se resaltarán los campos con información no válida 

Scenario: El administrador modifica un usuario viajero con información válida 
Given que el administrador está en el panel de administración  
When el administrador hace clic en un usuario viajero 
And haga clic en "Modificar"
And aparece un formulario de modificación con los datos actuales del usuario viajero 
And llena los campos con información válida 
And haga clic en "Modificar" 
Then el usuario seleccionado se actualizará en la base de datos con la información brindada 

Scenario: El administrador registra a un usuario viajero con información inválida 
Given que el administrador está en el panel de administración  
When el administrador hace clic en un usuario viajero 
And haga clic en "Modificar"
And aparece un formulario de modificación con los datos actuales del usuario viajero 
And llena los campos con información inválida 
And haga clic en "Modificar" 
Then se resaltarán los campos con información no válida

Scenario: El administrador elimina a un usuario viajero
Given  que el administrador está en el panel de administración de invitados 
When el administrador hace clic en un usuario viajero  
And haga clic en "Eliminar"  
Then el viajero seleccionado será archivado en la base de datos
