<script runat="server">
  Platform.Load("core", "1");

  // Retrieve form data
  var name = Request.GetFormField("name");
  var email = Request.GetFormField("email");
  var message = Request.GetFormField("message");

  if (name && email && message) {
    // Auth payload
    var payload = {
      "grant_type": "client_credentials",
      "client_id": "qtjojfvl1qa9ni6qbjkuix0v",
      "client_secret": "teqfoP6Dy3MC5KfVb4YGR4XT"
    };

    // Auth endpoint
    var url = "https://mctrjm16hqm0qmvrfyr-gshkk1p4.auth.marketingcloudapis.com/v2/token";
    var result = HTTP.Post(url, 'application/json', Stringify(payload));

    if (result.StatusCode == 200) {
      var response = Platform.Function.ParseJSON(result.Response[0]);
      var token = response.access_token;
      var resturl = response.rest_instance_url;

      // Journey endpoint
      var journeyurl = resturl + "interaction/v1/events";
      var journeypayload = {
        "ContactKey": "DD301",
        "EventDefinitionKey": "APISaurabh-2045e4c3-91fa-c705-20af-56e013e548a3",
        "Data": {
          "name": name,
          "EmailAddress": email,
          "message": message,
          "SubscriberKey": "DD301"
        }
      };

      // Post data to journey
      var ress = HTTP.Post(journeyurl, 'application/json', Stringify(journeypayload),["Authorization"],["Bearer "+token]);

      Write(Stringify(ress));
    } else {
      Write("Authentication failed. Check your client ID and secret.");
    }
  }
</script>
