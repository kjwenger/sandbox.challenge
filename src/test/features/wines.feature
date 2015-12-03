Feature: Wines

  Scenario: Get all wines
    Given I have registered all wines
    And I have started the node app
    And I have connected to the right database
    And I have connected to the right application
    When I get all wines
    Then response should have status code 200
    And response should have header property "content-type" with value "application/json; charset=utf-8"
    And data should have length 2

  Scenario: Get french wines
    Given I have started the node app
    And I have connected to the right database
    And I have connected to the right application
    When I get wines queried with 'q={"country":"France"}'
    Then response should have status code 200
    And response should have header property "content-type" with value "application/json; charset=utf-8"
    And data should have length 1

  Scenario: Get french wines simplified
    Given I have started the node app
    And I have connected to the right database
    And I have connected to the right application
    When I get wines queried with 'country=France'
    Then response should have status code 200
    And response should have header property "content-type" with value "application/json; charset=utf-8"
    And data should have length 1

  Scenario: Get croatian wines
    Given I have started the node app
    And I have connected to the right database
    And I have connected to the right application
    When I get wines queried with 'q={"country":"Croatia"}'
    Then response should have status code 200
    And response should have header property "content-type" with value "application/json; charset=utf-8"
    And data should have length 1

  Scenario: Get croatian wines simplified
    Given I have started the node app
    And I have connected to the right database
    And I have connected to the right application
    When I get wines queried with 'country=Croatia'
    Then response should have status code 200
    And response should have header property "content-type" with value "application/json; charset=utf-8"
    And data should have length 1

  Scenario: Get red wines
    Given I have started the node app
    And I have connected to the right database
    And I have connected to the right application
    When I get wines queried with 'q={"type":"red"}'
    Then response should have status code 200
    And response should have header property "content-type" with value "application/json; charset=utf-8"
    And data should have length 2

  Scenario: Get red wines simplified
    Given I have started the node app
    And I have connected to the right database
    And I have connected to the right application
    When I get wines queried with 'type=red'
    Then response should have status code 200
    And response should have header property "content-type" with value "application/json; charset=utf-8"
    And data should have length 2

  Scenario: Get old red wines
    Given I have started the node app
    And I have connected to the right database
    And I have connected to the right application
    When I get wines queried with 'q={"type":"red","year":1990}'
    Then response should have status code 200
    And response should have header property "content-type" with value "application/json; charset=utf-8"
    And data should have length 1

  Scenario: Get old red wines simplified
    Given I have started the node app
    And I have connected to the right database
    And I have connected to the right application
    When I get wines queried with 'type=red&year=1990'
    Then response should have status code 200
    And response should have header property "content-type" with value "application/json; charset=utf-8"
    And data should have length 1

  Scenario: Get wine 1
    Given I have started the node app
    And I have connected to the right database
    And I have connected to the right application
    When I get wine 1
    Then response should have status code 200
    And response should have header property "content-type" with value "application/json; charset=utf-8"
    And data should have property "id" with value 1
    And data should have property "name" with value "Pinot noir"
    And data should have property "year" with value 2011
    And data should have property "country" with value "France"
    And data should have property "type" with value "red"
    And data should have property "description" with value "Sensual and understated"

  Scenario: Get wine 2
    Given I have started the node app
    And I have connected to the right database
    And I have connected to the right application
    When I get wine 2
    Then response should have status code 200
    And response should have header property "content-type" with value "application/json; charset=utf-8"
    And data should have property "id" with value 2
    And data should have property "name" with value "Zinfandel"
    And data should have property "year" with value 1990
    And data should have property "country" with value "Croatia"
    And data should have property "type" with value "red"
    And data should have property "description" with value "Thick and jammy"

  Scenario: Get wine 3
    Given I have started the node app
    And I have connected to the right database
    And I have connected to the right application
    When I get wine 3
    Then response should have status code 400
    And response should have header property "content-type" with value "application/json; charset=utf-8"
    And data should be '{"error":"UNKNOWN_OBJECT"}'

  Scenario: Post wine 3
    Given I have started the node app
    And I have connected to the right database
    And I have connected to the right application
    And data is reset
    When data has property "id" with value 3
    And data has property "name" with value ""
    And data has property "year" with value 2013
    And data has property "country" with value "France"
    And data has property "type" with value "red"
    And data has property "description" with value "The Sean Connery of red wines"
    And I post wine 3
    Then response should have status code 400
    And response should have header property "content-type" with value "application/json; charset=utf-8"
    And data should be '{"error":"VALIDATION_ERROR","validation":{"name":"MISSING"}}'

  Scenario: Post wine 3
    Given I have started the node app
    And I have connected to the right database
    And I have connected to the right application
    And data is reset
    When data has property "id" with value 3
    And data has property "name" with value "Cabernet sauvignon"
    And data has property "year" with value -3
    And data has property "country" with value "France"
    And data has property "type" with value "red"
    And data has property "description" with value "The Sean Connery of red wines"
    And I post wine 3
    Then response should have status code 400
    And response should have header property "content-type" with value "application/json; charset=utf-8"
    And data should be '{"error":"VALIDATION_ERROR","validation":{"year":"INVALID"}}'

  Scenario: Post wine 3
    Given I have started the node app
    And I have connected to the right database
    And I have connected to the right application
    And data is reset
    When data has property "id" with value 3
    And data has property "name" with value "Cabernet sauvignon"
    And data has property "year" with value 2013
    And data has property "country" with value ""
    And data has property "type" with value "red"
    And data has property "description" with value "The Sean Connery of red wines"
    And I post wine 3
    Then response should have status code 400
    And response should have header property "content-type" with value "application/json; charset=utf-8"
    And data should be '{"error":"VALIDATION_ERROR","validation":{"country":"MISSING"}}'

  Scenario: Post wine 3
    Given I have started the node app
    And I have connected to the right database
    And I have connected to the right application
    And data is reset
    When data has property "id" with value 3
    And data has property "name" with value "Cabernet sauvignon"
    And data has property "type" with value "red"
    And data has property "description" with value "The Sean Connery of red wines"
    And I post wine 3
    Then response should have status code 400
    And response should have header property "content-type" with value "application/json; charset=utf-8"
    And data should be '{"error":"VALIDATION_ERROR","validation":{"country":"MISSING","year":"MISSING"}}'

  Scenario: Post wine 3
    Given I have started the node app
    And I have connected to the right database
    And I have connected to the right application
    And data is reset
    When data has property "id" with value 3
    And data has property "name" with value "Cabernet sauvignon"
    And data has property "year" with value 2013
    And data has property "country" with value "France"
    And data has property "type" with value "blue"
    And data has property "description" with value "The Sean Connery of red wines"
    And I post wine 3
    Then response should have status code 400
    And response should have header property "content-type" with value "application/json; charset=utf-8"
    And data should be '{"error":"VALIDATION_ERROR","validation":{"type":"INVALID"}}'

  Scenario: Post wine 3
    Given I have started the node app
    And I have connected to the right database
    And I have connected to the right application
    And data is reset
    When data has property "id" with value 3
    And data has property "name" with value "Cabernet sauvignon"
    And data has property "year" with value 2013
    And data has property "country" with value "France"
    And data has property "type" with value "red"
    And data has property "description" with value "The Sean Connery of red wines"
    And I post wine 3
    Then response should have status code 200
    And response should have header property "content-type" with value "application/json; charset=utf-8"
    And data should have property "id" with value 3
    And data should have property "name" with value "Cabernet sauvignon"
    And data should have property "year" with value 2013
    And data should have property "country" with value "France"
    And data should have property "type" with value "red"
    And data should have property "description" with value "The Sean Connery of red wines"

  Scenario: Get wine 3
    Given I have started the node app
    And I have connected to the right database
    And I have connected to the right application
    When I get wine 3
    Then response should have status code 200
    And response should have header property "content-type" with value "application/json; charset=utf-8"
    And data should have property "id" with value 3
    And data should have property "name" with value "Cabernet sauvignon"
    And data should have property "year" with value 2013
    And data should have property "country" with value "France"
    And data should have property "type" with value "red"
    And data should have property "description" with value "The Sean Connery of red wines"

  Scenario: Get wine 2
    Given I have started the node app
    And I have connected to the right database
    And I have connected to the right application
    When I get wine 2
    Then response should have status code 200
    And response should have header property "content-type" with value "application/json; charset=utf-8"
    And data should have property "id" with value 2
    And data should have property "name" with value "Zinfandel"
    And data should have property "year" with value 1990
    And data should have property "country" with value "Croatia"
    And data should have property "type" with value "red"
    And data should have property "description" with value "Thick and jammy"

  Scenario: Get wine 1
    Given I have started the node app
    And I have connected to the right database
    And I have connected to the right application
    When I get wine 1
    Then response should have status code 200
    And response should have header property "content-type" with value "application/json; charset=utf-8"
    And data should have property "id" with value 1
    And data should have property "name" with value "Pinot noir"
    And data should have property "year" with value 2011
    And data should have property "country" with value "France"
    And data should have property "type" with value "red"
    And data should have property "description" with value "Sensual and understated"

  Scenario: Put wine 3
    Given I have started the node app
    And I have connected to the right database
    And I have connected to the right application
    And data is reset
    When data has property "id" with value 3
    And data has property "name" with value "Cabernet sauvignon"
    And data has property "year" with value 2013
    And data has property "country" with value "France"
    And data has property "type" with value "red"
    And data has property "description" with value "Quite similar to merlot"
    And I put wine 3
    Then response should have status code 200
    And response should have header property "content-type" with value "application/json; charset=utf-8"
    And data should have property "id" with value 3
    And data should have property "name" with value "Cabernet sauvignon"
    And data should have property "year" with value 2013
    And data should have property "country" with value "France"
    And data should have property "type" with value "red"
    And data should have property "description" with value "Quite similar to merlot"

  Scenario: Put wine 3
    Given I have started the node app
    And I have connected to the right database
    And I have connected to the right application
    And data is reset
    When data has property "id" with value 3
    And data has property "description" with value "Similar to merlot"
    And I put wine 3
    Then response should have status code 200
    And response should have header property "content-type" with value "application/json; charset=utf-8"
    And data should have property "id" with value 3
    And data should have property "name" with value "Cabernet sauvignon"
    And data should have property "year" with value 2013
    And data should have property "country" with value "France"
    And data should have property "type" with value "red"
    And data should have property "description" with value "Similar to merlot"

  Scenario: Post wine 3 again
    Given I have started the node app
    And I have connected to the right database
    And I have connected to the right application
    And data is reset
    When data has property "id" with value 3
    And data has property "name" with value "Cabernet sauvignon"
    And data has property "year" with value 2013
    And data has property "country" with value "France"
    And data has property "type" with value "red"
    And data has property "description" with value "The Sean Connery of red wines"
    And I post wine 3
    Then response should have status code 500
    And response should have header property "content-type" with value "application/json; charset=utf-8"
    And data should be '{"error":"DUPLICATION_ERROR","duplication":{"id":"3"}}'

  Scenario: Put wine 4
    Given I have started the node app
    And I have connected to the right database
    And I have connected to the right application
    And data is reset
    When data has property "name" with value "Cabernet sauvignon"
    And data has property "year" with value 2013
    And data has property "country" with value "France"
    And data has property "type" with value "red"
    And data has property "description" with value "Similar to merlot"
    And I put wine 4
    Then response should have status code 400
    And response should have header property "content-type" with value "application/json; charset=utf-8"
    And data should be '{"error":"UNKNOWN_OBJECT"}'

  Scenario: Put wine 4
    Given I have started the node app
    And I have connected to the right database
    And I have connected to the right application
    And data is reset
    And data has property "description" with value "Similar to merlot"
    And I put wine 4
    Then response should have status code 400
    And response should have header property "content-type" with value "application/json; charset=utf-8"
    And data should be '{"error":"UNKNOWN_OBJECT"}'

  Scenario: Get wine 4
    Given I have started the node app
    And I have connected to the right database
    And I have connected to the right application
    When I get wine 4
    Then response should have status code 400
    And response should have header property "content-type" with value "application/json; charset=utf-8"
    And data should be '{"error":"UNKNOWN_OBJECT"}'

  Scenario: Delete wine 3
    Given I have started the node app
    And I have connected to the right database
    And I have connected to the right application
    When I delete wine 3
    Then response should have status code 200
    And response should have header property "content-type" with value "application/json; charset=utf-8"
    And data should be '{"success":true}'

  Scenario: Delete wine 3
    Given I have started the node app
    And I have connected to the right database
    And I have connected to the right application
    When I delete wine 3
    Then response should have status code 400
    And response should have header property "content-type" with value "application/json; charset=utf-8"
    And data should be '{"error":"UNKNOWN_OBJECT"}'
