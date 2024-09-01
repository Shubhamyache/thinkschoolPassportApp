using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PassportApplicationWebApi.Migrations
{
    /// <inheritdoc />
    public partial class complaintUpdatedfieldsAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "Complaints",
                type: "nvarchar(55)",
                maxLength: 55,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MobileNumber",
                table: "Complaints",
                type: "nvarchar(15)",
                maxLength: 15,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FullName",
                table: "Complaints");

            migrationBuilder.DropColumn(
                name: "MobileNumber",
                table: "Complaints");
        }
    }
}
