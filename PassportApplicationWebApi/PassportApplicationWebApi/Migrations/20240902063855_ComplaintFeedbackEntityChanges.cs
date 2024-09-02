using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PassportApplicationWebApi.Migrations
{
    /// <inheritdoc />
    public partial class ComplaintFeedbackEntityChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Feedbacks_Users_UserId",
                table: "Feedbacks");

            migrationBuilder.DropIndex(
                name: "IX_Feedbacks_UserId",
                table: "Feedbacks");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Feedbacks");

            migrationBuilder.RenameColumn(
                name: "PassportNumber",
                table: "Feedbacks",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "PassportNumber",
                table: "Complaints",
                newName: "PassportNumberOrApplicationNumber");

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

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Complaints",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

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
                name: "ApplicationNumber",
                table: "PaymentDetails");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "PaymentDetails");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Complaints");

            migrationBuilder.DropColumn(
                name: "FullName",
                table: "Complaints");

            migrationBuilder.DropColumn(
                name: "MobileNumber",
                table: "Complaints");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Feedbacks",
                newName: "PassportNumber");

            migrationBuilder.RenameColumn(
                name: "PassportNumberOrApplicationNumber",
                table: "Complaints",
                newName: "PassportNumber");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Feedbacks",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Feedbacks_UserId",
                table: "Feedbacks",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Feedbacks_Users_UserId",
                table: "Feedbacks",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
