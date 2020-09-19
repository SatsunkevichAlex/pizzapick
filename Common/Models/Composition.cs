using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Common.Models
{
    public class Composition
    {
        [Key]
        [JsonIgnore]
        public int Id { get; set; }
        public List<string> Content { get; set; }

        [JsonIgnore]
        public int PizzaId { get; set; }
    }
}
