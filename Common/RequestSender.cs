using Newtonsoft.Json.Linq;
using RestSharp;
using System;

namespace Common
{
    public class RequestSender
    {
        private const string FOX_URL = "https://pzz.by/api/v1/pizzas";
        private const string PAPA_URL = "https://api.papajohns.by/catalog/goods?lang=ru&city_id=1&platform=web";
        private readonly RestClient _client;        

        public RequestSender()
        {
            _client = new RestClient();
        }

        public JToken GetPizzasData(PizzaProviders provider)
        {            
            var request = new RestRequest(Method.GET);
            var response = string.Empty;
            switch (provider)
            {
                case PizzaProviders.PizzaFox:
                    request.Resource = FOX_URL;
                    response = _client.Get(request).Content;
                    return GetFoxJsonData(response);
                case PizzaProviders.PapaJohns:
                    request.Resource = PAPA_URL;
                    response = _client.Get(request).Content;
                    return GetPapaJsonData(response);
                default:
                    throw new InvalidOperationException(
                        $"Pizza provier:" +
                        $" '{provider}' is not recognized");    
            }
        }

        private JToken GetFoxJsonData(string response)
        {
            return JObject.Parse(response)["response"]["data"];
        }

        private JToken GetPapaJsonData(string response)
        {
            const int pizzasIndex = 0;
            return JArray.
                Parse(response)[pizzasIndex]["goods"];
        }
    }
}
