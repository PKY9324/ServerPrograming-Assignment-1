using System.ComponentModel.DataAnnotations;
using Microsoft.Extensions.DependencyInjection;

namespace CalculateApi.Models
{
    [ActivatorUtilitiesConstructor]
    public class Calculate
    {
        [Key]
        public long Id { get; set; }
        public int result { get; set; }

    }
}