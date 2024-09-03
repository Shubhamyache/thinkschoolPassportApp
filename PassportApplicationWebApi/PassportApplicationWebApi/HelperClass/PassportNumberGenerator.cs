namespace PassportApplicationWebApi.HelperClass
{
    public static class PassportNumberGenerator
    {
        private static Random _random = new Random();

        public static string GeneratePassportNumber()
        {
            char letter = (char)_random.Next('A', 'Z' + 1); // Generate a random letter
            string numbers = _random.Next(1000000, 10000000).ToString(); // Generate a 7-digit number
            return $"{letter}{numbers}"; // Combine the letter and the number
        }
    }
}
