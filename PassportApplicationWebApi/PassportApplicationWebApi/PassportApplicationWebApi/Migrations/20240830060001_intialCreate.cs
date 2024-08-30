using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PassportApplicationWebApi.Migrations
{
    /// <inheritdoc />
    public partial class intialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApplicationId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ApplicationStatus",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PassportStatus",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "RenewalApplicationId",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "RenewalApplicationStatus",
                table: "Users",
                newName: "ApplicationNumber");

            migrationBuilder.AddColumn<int>(
                name: "PassportStatus",
                table: "Passports",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "AddressDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PresentHouseStreet = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PresentTown = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PresentDistrict = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PresentPoliceStation = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PresentState = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Pincode = table.Column<int>(type: "int", nullable: false),
                    MobileNumber = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    TelephoneNumber = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    SameAddress = table.Column<bool>(type: "bit", nullable: false),
                    PermanentHouseStreet = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PermanentTown = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PermanentDistrict = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PermanentPoliceStation = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PermanentState = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PermanentPin = table.Column<string>(type: "nvarchar(6)", maxLength: 6, nullable: false),
                    PermanentMobileNumber = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    PermanentTelephoneNumber = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    IsAddressDetailsValid = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AddressDetails", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ApplicantsDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GivenName = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Surname = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    KnownByOtherNames = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Alias = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ChangedName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PreviousName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DOB = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PlaceOfBirth = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    District = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    State = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    RegionCountry = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    MaritalStatus = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Citizenship = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PanNumber = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    VoterId = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    EmploymentType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    OrganizationName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ParentSpouseGovernmentServant = table.Column<bool>(type: "bit", nullable: false),
                    Education = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    NonECR = table.Column<bool>(type: "bit", nullable: false),
                    DistinguishingMark = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Aadhaar = table.Column<string>(type: "nvarchar(12)", maxLength: 12, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicantsDetails", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Documents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdentityProof = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    AddressProof = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    AgeProof = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    PassportPhoto = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Documents", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EmergencyContactDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmergencyContactName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    EmergencyContactMobile = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    EmergencyContactTelephone = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    EmergencyContactEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmergencyContactDetails", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FamilyDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FatherGivenName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    FatherSurname = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    MotherGivenName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    MotherSurname = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LegalGuardianGivenName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LegalGuardianSurname = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    SpouseGivenName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    SpouseSurname = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ApplicantMinor = table.Column<bool>(type: "bit", nullable: false),
                    FatherPassportNumber = table.Column<string>(type: "nvarchar(9)", maxLength: 9, nullable: false),
                    FatherNationality = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    MotherPassportNumber = table.Column<string>(type: "nvarchar(9)", maxLength: 9, nullable: false),
                    MotherNationality = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FamilyDetails", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PaymentDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TransactionNumber = table.Column<Guid>(type: "uniqueidentifier", maxLength: 50, nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PaymentDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PaymentMethod = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    PaymentDetail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    ApplicationId = table.Column<int>(type: "int", nullable: false),
                    ApplicationType = table.Column<int>(type: "int", maxLength: 20, nullable: false),
                    PaymentStatus = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PaymentDetails_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PassportApplications",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ApplicationNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PassportNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReIssueReason = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    validityInYears = table.Column<int>(type: "int", nullable: true),
                    ChangesInExistingDetails = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ApplicantDetailsId = table.Column<int>(type: "int", nullable: false),
                    FamilyDetailsId = table.Column<int>(type: "int", nullable: false),
                    AddressDetailsId = table.Column<int>(type: "int", nullable: false),
                    EmergencyContactDetailsId = table.Column<int>(type: "int", nullable: false),
                    PreviousPassportDetailsId = table.Column<int>(type: "int", nullable: true),
                    DocumentsId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PaymentDetailsId = table.Column<int>(type: "int", nullable: false),
                    IsRenewalApplication = table.Column<bool>(type: "bit", nullable: false),
                    RejectedMessage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ApplicationStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PassportApplications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PassportApplications_AddressDetails_AddressDetailsId",
                        column: x => x.AddressDetailsId,
                        principalTable: "AddressDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PassportApplications_ApplicantsDetails_ApplicantDetailsId",
                        column: x => x.ApplicantDetailsId,
                        principalTable: "ApplicantsDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PassportApplications_Documents_DocumentsId",
                        column: x => x.DocumentsId,
                        principalTable: "Documents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PassportApplications_EmergencyContactDetails_EmergencyContactDetailsId",
                        column: x => x.EmergencyContactDetailsId,
                        principalTable: "EmergencyContactDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PassportApplications_FamilyDetails_FamilyDetailsId",
                        column: x => x.FamilyDetailsId,
                        principalTable: "FamilyDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PassportApplications_Passports_PreviousPassportDetailsId",
                        column: x => x.PreviousPassportDetailsId,
                        principalTable: "Passports",
                        principalColumn: "PassportId");
                    table.ForeignKey(
                        name: "FK_PassportApplications_PaymentDetails_PaymentDetailsId",
                        column: x => x.PaymentDetailsId,
                        principalTable: "PaymentDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PassportApplications_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_PassportApplications_AddressDetailsId",
                table: "PassportApplications",
                column: "AddressDetailsId");

            migrationBuilder.CreateIndex(
                name: "IX_PassportApplications_ApplicantDetailsId",
                table: "PassportApplications",
                column: "ApplicantDetailsId");

            migrationBuilder.CreateIndex(
                name: "IX_PassportApplications_DocumentsId",
                table: "PassportApplications",
                column: "DocumentsId");

            migrationBuilder.CreateIndex(
                name: "IX_PassportApplications_EmergencyContactDetailsId",
                table: "PassportApplications",
                column: "EmergencyContactDetailsId");

            migrationBuilder.CreateIndex(
                name: "IX_PassportApplications_FamilyDetailsId",
                table: "PassportApplications",
                column: "FamilyDetailsId");

            migrationBuilder.CreateIndex(
                name: "IX_PassportApplications_PaymentDetailsId",
                table: "PassportApplications",
                column: "PaymentDetailsId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PassportApplications_PreviousPassportDetailsId",
                table: "PassportApplications",
                column: "PreviousPassportDetailsId");

            migrationBuilder.CreateIndex(
                name: "IX_PassportApplications_UserId",
                table: "PassportApplications",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentDetails_UserId",
                table: "PaymentDetails",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PassportApplications");

            migrationBuilder.DropTable(
                name: "AddressDetails");

            migrationBuilder.DropTable(
                name: "ApplicantsDetails");

            migrationBuilder.DropTable(
                name: "Documents");

            migrationBuilder.DropTable(
                name: "EmergencyContactDetails");

            migrationBuilder.DropTable(
                name: "FamilyDetails");

            migrationBuilder.DropTable(
                name: "PaymentDetails");

            migrationBuilder.DropColumn(
                name: "PassportStatus",
                table: "Passports");

            migrationBuilder.RenameColumn(
                name: "ApplicationNumber",
                table: "Users",
                newName: "RenewalApplicationStatus");

            migrationBuilder.AddColumn<int>(
                name: "ApplicationId",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ApplicationStatus",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PassportStatus",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RenewalApplicationId",
                table: "Users",
                type: "int",
                nullable: true);
        }
    }
}
