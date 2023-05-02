Scenario: El admiinistrador visualiza la página web de manera corercta
Given que usuario viajero escribe en la barra de busqueda "https://lifetravel-fc935.web.app/"
When  haga clic en este   
Then accederá a la página web
And se direcionara a la vista de viajeros

Scenario: El adminitrador visualiza la página web de manera incorercta
Given que usuario viajero escribe en la barra de busqueda "https://lifetravel-fc985.web.app/"
When  haga clic en este   
Then no accederá a la página web
And  se le mostra un error 404
