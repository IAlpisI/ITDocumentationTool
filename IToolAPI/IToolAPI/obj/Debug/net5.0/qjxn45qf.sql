IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [DCandidate] (
    [id] int NOT NULL IDENTITY,
    [fullName] varchar(100) NULL,
    [mobille] varchar(100) NULL,
    [email] varchar(100) NULL,
    [age] varchar(100) NOT NULL,
    [bloodGroup] varchar(100) NULL,
    [address] varchar(100) NULL,
    CONSTRAINT [PK_DCandidate] PRIMARY KEY ([id])
);
GO

CREATE TABLE [Users] (
    [id] int NOT NULL IDENTITY,
    [Name] nvarchar(max) NULL,
    [Email] nvarchar(max) NULL,
    [Password] nvarchar(max) NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY ([id])
);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210318144626_New table', N'5.0.3');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

DECLARE @var0 sysname;
SELECT @var0 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Users]') AND [c].[name] = N'Email');
IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [Users] DROP CONSTRAINT [' + @var0 + '];');
ALTER TABLE [Users] ALTER COLUMN [Email] nvarchar(450) NULL;
GO

CREATE UNIQUE INDEX [IX_Users_Email] ON [Users] ([Email]) WHERE [Email] IS NOT NULL;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210318145105_update user', N'5.0.3');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

EXEC sp_rename N'[Users].[id]', N'Id', N'COLUMN';
GO

ALTER TABLE [Users] ADD [Role] nvarchar(max) NULL;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210319194428_added roles', N'5.0.3');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [General] (
    [Id] int NOT NULL IDENTITY,
    [Title] nvarchar(max) NOT NULL,
    [Purpose] nvarchar(max) NULL,
    [Status] nvarchar(max) NULL,
    [CreatioDate] datetime2 NOT NULL,
    [DateOfChange] datetime2 NOT NULL,
    [Tag] nvarchar(max) NULL,
    [Description] nvarchar(max) NULL,
    CONSTRAINT [PK_General] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [People] (
    [Id] int NOT NULL IDENTITY,
    [FirstName] nvarchar(max) NULL,
    [LastName] nvarchar(max) NULL,
    [Function] nvarchar(max) NULL,
    [EMailAdress] nvarchar(max) NULL,
    [CompanyNumber] nvarchar(max) NULL,
    [PersonalNumber] nvarchar(max) NULL,
    [Description] nvarchar(max) NULL,
    [GeneralId] int NULL,
    CONSTRAINT [PK_People] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_People_General_GeneralId] FOREIGN KEY ([GeneralId]) REFERENCES [General] ([Id]) ON DELETE NO ACTION
);
GO

CREATE INDEX [IX_People_GeneralId] ON [People] ([GeneralId]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210325134713_PeopleEntity', N'5.0.3');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210325135556_PeopleEntity2', N'5.0.3');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

ALTER TABLE [People] DROP CONSTRAINT [FK_People_General_GeneralId];
GO

DROP INDEX [IX_People_GeneralId] ON [People];
DECLARE @var1 sysname;
SELECT @var1 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[People]') AND [c].[name] = N'GeneralId');
IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [People] DROP CONSTRAINT [' + @var1 + '];');
ALTER TABLE [People] ALTER COLUMN [GeneralId] int NOT NULL;
ALTER TABLE [People] ADD DEFAULT 0 FOR [GeneralId];
CREATE INDEX [IX_People_GeneralId] ON [People] ([GeneralId]);
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'CreatioDate', N'DateOfChange', N'Description', N'Purpose', N'Status', N'Tag', N'Title') AND [object_id] = OBJECT_ID(N'[General]'))
    SET IDENTITY_INSERT [General] ON;
INSERT INTO [General] ([Id], [CreatioDate], [DateOfChange], [Description], [Purpose], [Status], [Tag], [Title])
VALUES (1, '2021-03-25T00:00:00.0000000+02:00', '2021-03-25T00:00:00.0000000+02:00', N'fasfasfsa', N'fasfsafsa', N'ffasfas', N'["test","test"]', N'fafasfas');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'CreatioDate', N'DateOfChange', N'Description', N'Purpose', N'Status', N'Tag', N'Title') AND [object_id] = OBJECT_ID(N'[General]'))
    SET IDENTITY_INSERT [General] OFF;
GO

IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'CompanyNumber', N'Description', N'EMailAdress', N'FirstName', N'Function', N'GeneralId', N'LastName', N'PersonalNumber') AND [object_id] = OBJECT_ID(N'[People]'))
    SET IDENTITY_INSERT [People] ON;
INSERT INTO [People] ([Id], [CompanyNumber], [Description], [EMailAdress], [FirstName], [Function], [GeneralId], [LastName], [PersonalNumber])
VALUES (1, N'213524', N'asfasfas', N'afassa', N'asfsaffa', N'fasfasfsa', 1, N'ddasdas', N'fsdfdsgdsg');
IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'CompanyNumber', N'Description', N'EMailAdress', N'FirstName', N'Function', N'GeneralId', N'LastName', N'PersonalNumber') AND [object_id] = OBJECT_ID(N'[People]'))
    SET IDENTITY_INSERT [People] OFF;
GO

ALTER TABLE [People] ADD CONSTRAINT [FK_People_General_GeneralId] FOREIGN KEY ([GeneralId]) REFERENCES [General] ([Id]) ON DELETE CASCADE;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210325202500_Data', N'5.0.3');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

DECLARE @var2 sysname;
SELECT @var2 = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[People]') AND [c].[name] = N'EMailAdress');
IF @var2 IS NOT NULL EXEC(N'ALTER TABLE [People] DROP CONSTRAINT [' + @var2 + '];');
ALTER TABLE [People] DROP COLUMN [EMailAdress];
GO

EXEC sp_rename N'[People].[LastName]', N'FullName', N'COLUMN';
GO

EXEC sp_rename N'[People].[FirstName]', N'EmailAddress', N'COLUMN';
GO

UPDATE [General] SET [CreatioDate] = '2021-04-08T00:00:00.0000000+03:00', [DateOfChange] = '2021-04-08T00:00:00.0000000+03:00'
WHERE [Id] = 1;
SELECT @@ROWCOUNT;

GO

UPDATE [People] SET [EmailAddress] = N'afassa', [FullName] = N'asfsaffa'
WHERE [Id] = 1;
SELECT @@ROWCOUNT;

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210408102456_fixed username', N'5.0.3');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210408102734_changed databse name', N'5.0.3');
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20210410165752_addSomething', N'5.0.3');
GO

COMMIT;
GO

