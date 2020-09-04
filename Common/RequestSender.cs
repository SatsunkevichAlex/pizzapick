using Newtonsoft.Json.Linq;
using RestSharp;

namespace Common
{
    public class RequestSender
    {
        private const string PIZZAS_URL = "https://pzz.by/api/v1/pizzas";
        private readonly RestClient _client;        

        public RequestSender()
        {
            _client = new RestClient();
        }

        public JToken GetPizzasData()
        {            
            var request = new RestRequest(PIZZAS_URL, Method.GET);
            var response = _client.Get(request).Content;
            return JObject.Parse(response)["response"]["data"];
        }
    }
}
