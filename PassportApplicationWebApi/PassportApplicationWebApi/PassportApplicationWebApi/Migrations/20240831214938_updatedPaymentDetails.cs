using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PassportApplicationWebApi.Migrations
{
    /// <inheritdoc />
    public partial class updatedPaymentDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PassportNumber",
                table: "Feedbacks");

            migrationBuilder.AddColumn<string>(
                name: "ApplicationNumber",
                table: "PaymentDetails",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "PaymentDetails",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApplicationNumber",
                table: "PaymentDetails");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "PaymentDetails");

            migrationBuilder.AddColumn<string>(
                name: "PassportNumber",
                table: "Feedbacks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
