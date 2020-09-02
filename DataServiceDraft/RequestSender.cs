using System;
using System.Net;

namespace DataServiceDraft
{
    internal class RequestSender
    {
        internal string GetPizzasPage(string url)
        {
            string page = string.Empty;
            using (WebClient client = new WebClient())
            {
                var uri = new Uri(url);
                page = client.DownloadString(uri);
            }

            return page;
        }
    }
}
