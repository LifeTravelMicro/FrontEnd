Scenario: El usuario registra una agencia con información válida  
Given que la persona se encuentra en el panel de administración 
When el usuario hace clic en "Agency"  
And llena los campos con información válida 
And haga clic en "Add" 
Then e creará una agencia en la base de datos con la información proporcionada 

Scenario: El usuario registra una agencia con información inválida 
Given que la persona se encuentra en el panel de administración 
When el usuario hace clic en "Agency" 
And llena los campos con información inválida 
And haga clic en "Add" 
Then se resaltarán los campos con información no válida 

Scenario:El usuario modifica una agencia con información válida 
Given que el usuario está en el panel de administración   
When hace clic en una agencia  
And haga clic en "Modificar"
And aaparece un formulario de modificación con los datos actuales de las agencias
And llena los campos con información válida 
And haga clic en "Modificar" 
Then a agencia seleccionada se actualizará en la base de datos con la información brindada 

Scenario: El usuario registra una agencia con información inválida 
Given que el usuario está en el panel de administración  
When el usuario registre una agencia 
And haga clic en "Modificar"
And aparece un formulario de modificación con los datos de la agencia
And llena los campos con información inválida 
And haga clic en "Modificar" 
Then se resaltarán los campos con información no válida

Scenario: El administrador elimina una agencia 
Given que el usuario está en el panel de administración  
When hace clic en un agencia
And haga clic en "Eliminar"  
Then la agencia seleccionada será eliminada 
