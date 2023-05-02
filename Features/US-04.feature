Scenario: El administrador registra un pago con información válida 
Given que el administrador está en el panel de administración  
When el administrador hace clic en "Payments"  
And llena los campos con información válida 
And haga clic en "Add" 
Then se creará un pago en la base de datos con la información proporcionada. 

Scenario: El administrador registra un pago con información inválida 
Given que el administrador está en el panel de administración  
When el usuario hace clic en "Agency" 
And llena los campos con información inválida 
And haga clic en "Add" 
Then se resaltarán los campos con información no válida 

Scenario:El administrador modifica un pago con información válida 
Given que el administrador está en el panel de administración  
When el administrador hace clic en un pago 
And haga clic en "Modificar"
And aparece un formulario de modificación con los datos actuales del pago 
And lena los campos con información válida  
And haga clic en "Modificar" 
Then el pago seleccionado se actualizará en la base de datos con la información brindada  

Scenario: El administrador modifica un pago con información inválida 
Given que el administrador está en el panel de administración del servicio 
When el administrador hace clic en un pago 
And haga clic en "Modificar"
And aparece un formulario de modificación con los datos del pago
And llena los campos con información inválida 
And haga clic en "Modificar" 
Then se resaltarán los campos con información no válida

Scenario: El administrador elimina un pago 
Given el administrador hace clic en el pago    
When hace clic en un agencia
And haga clic en "Eliminar"  
Then el pago seleccionado será archivado en la base de datos.
