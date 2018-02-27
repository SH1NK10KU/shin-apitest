Feature: Interface Template
  In order to test interfaces
  As a tester
  I want to send HTTP request to verify the response.
    
  @BaiduSearchWithDataFile
  Scenario: Simple Interface Test
    Given a request data from "sample.json" for search interface
    When I send a GET request
    Then the response "response" should be 200
  
  @BaiduSearchWithDataDriven
  Scenario Outline: Complex Interface Test
    Given a request data: <data> for <api> interface
    When I send a <type> request
    Then the response "<param>" should be <value>
    
    Examples:
      | api    | data              | type | param    | value |
      | search | {"wd":"Keyword1"} | GET  | response | 200   |

  @BaiduSearchWithParams
  Scenario: 接口测试
    Given 搜索接口：发送数据“{"wd":"shin-apitest"}”
    When 发送GET请求
    Then 响应参数“response”应为：200

  @BaiduSearchWithDataFile
  Scenario: Simple Interface Test
    Given 搜索接口：发送数据从文件“sample.json”
    When 发送GET请求
    Then 响应参数“response”应为：200
  
  @BaiduSearchWithDataDriven
  Scenario Outline: Complex Interface Test
    Given <api>接口：发送数据“<data>”
    When 发送<type>请求
    Then 响应参数“<param>”应为：<value>
    
    Examples:
      | api    | data              | type | param    | value |
      | search | {"wd":"Keyword1"} | GET  | response | 200   |