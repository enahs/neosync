// Code generated by protoc-gen-connect-go. DO NOT EDIT.
//
// Source: mgmt/v1alpha1/user_account.proto

package mgmtv1alpha1connect

import (
	connect "connectrpc.com/connect"
	context "context"
	errors "errors"
	v1alpha1 "github.com/nucleuscloud/neosync/backend/gen/go/protos/mgmt/v1alpha1"
	http "net/http"
	strings "strings"
)

// This is a compile-time assertion to ensure that this generated file and the connect package are
// compatible. If you get a compiler error that this constant is not defined, this code was
// generated with a version of connect newer than the one compiled into your binary. You can fix the
// problem by either regenerating this code with an older version of connect or updating the connect
// version compiled into your binary.
const _ = connect.IsAtLeastVersion0_1_0

const (
	// UserAccountServiceName is the fully-qualified name of the UserAccountService service.
	UserAccountServiceName = "mgmt.v1alpha1.UserAccountService"
)

// These constants are the fully-qualified names of the RPCs defined in this package. They're
// exposed at runtime as Spec.Procedure and as the final two segments of the HTTP route.
//
// Note that these are different from the fully-qualified method names used by
// google.golang.org/protobuf/reflect/protoreflect. To convert from these constants to
// reflection-formatted method names, remove the leading slash and convert the remaining slash to a
// period.
const (
	// UserAccountServiceGetUserProcedure is the fully-qualified name of the UserAccountService's
	// GetUser RPC.
	UserAccountServiceGetUserProcedure = "/mgmt.v1alpha1.UserAccountService/GetUser"
	// UserAccountServiceSetUserProcedure is the fully-qualified name of the UserAccountService's
	// SetUser RPC.
	UserAccountServiceSetUserProcedure = "/mgmt.v1alpha1.UserAccountService/SetUser"
	// UserAccountServiceGetUserAccountsProcedure is the fully-qualified name of the
	// UserAccountService's GetUserAccounts RPC.
	UserAccountServiceGetUserAccountsProcedure = "/mgmt.v1alpha1.UserAccountService/GetUserAccounts"
	// UserAccountServiceSetPersonalAccountProcedure is the fully-qualified name of the
	// UserAccountService's SetPersonalAccount RPC.
	UserAccountServiceSetPersonalAccountProcedure = "/mgmt.v1alpha1.UserAccountService/SetPersonalAccount"
	// UserAccountServiceConvertPersonalToTeamAccountProcedure is the fully-qualified name of the
	// UserAccountService's ConvertPersonalToTeamAccount RPC.
	UserAccountServiceConvertPersonalToTeamAccountProcedure = "/mgmt.v1alpha1.UserAccountService/ConvertPersonalToTeamAccount"
	// UserAccountServiceIsUserInAccountProcedure is the fully-qualified name of the
	// UserAccountService's IsUserInAccount RPC.
	UserAccountServiceIsUserInAccountProcedure = "/mgmt.v1alpha1.UserAccountService/IsUserInAccount"
)

// UserAccountServiceClient is a client for the mgmt.v1alpha1.UserAccountService service.
type UserAccountServiceClient interface {
	GetUser(context.Context, *connect.Request[v1alpha1.GetUserRequest]) (*connect.Response[v1alpha1.GetUserResponse], error)
	SetUser(context.Context, *connect.Request[v1alpha1.SetUserRequest]) (*connect.Response[v1alpha1.SetUserResponse], error)
	GetUserAccounts(context.Context, *connect.Request[v1alpha1.GetUserAccountsRequest]) (*connect.Response[v1alpha1.GetUserAccountsResponse], error)
	SetPersonalAccount(context.Context, *connect.Request[v1alpha1.SetPersonalAccountRequest]) (*connect.Response[v1alpha1.SetPersonalAccountResponse], error)
	ConvertPersonalToTeamAccount(context.Context, *connect.Request[v1alpha1.ConvertPersonalToTeamAccountRequest]) (*connect.Response[v1alpha1.ConvertPersonalToTeamAccountResponse], error)
	IsUserInAccount(context.Context, *connect.Request[v1alpha1.IsUserInAccountRequest]) (*connect.Response[v1alpha1.IsUserInAccountResponse], error)
}

// NewUserAccountServiceClient constructs a client for the mgmt.v1alpha1.UserAccountService service.
// By default, it uses the Connect protocol with the binary Protobuf Codec, asks for gzipped
// responses, and sends uncompressed requests. To use the gRPC or gRPC-Web protocols, supply the
// connect.WithGRPC() or connect.WithGRPCWeb() options.
//
// The URL supplied here should be the base URL for the Connect or gRPC server (for example,
// http://api.acme.com or https://acme.com/grpc).
func NewUserAccountServiceClient(httpClient connect.HTTPClient, baseURL string, opts ...connect.ClientOption) UserAccountServiceClient {
	baseURL = strings.TrimRight(baseURL, "/")
	return &userAccountServiceClient{
		getUser: connect.NewClient[v1alpha1.GetUserRequest, v1alpha1.GetUserResponse](
			httpClient,
			baseURL+UserAccountServiceGetUserProcedure,
			opts...,
		),
		setUser: connect.NewClient[v1alpha1.SetUserRequest, v1alpha1.SetUserResponse](
			httpClient,
			baseURL+UserAccountServiceSetUserProcedure,
			opts...,
		),
		getUserAccounts: connect.NewClient[v1alpha1.GetUserAccountsRequest, v1alpha1.GetUserAccountsResponse](
			httpClient,
			baseURL+UserAccountServiceGetUserAccountsProcedure,
			opts...,
		),
		setPersonalAccount: connect.NewClient[v1alpha1.SetPersonalAccountRequest, v1alpha1.SetPersonalAccountResponse](
			httpClient,
			baseURL+UserAccountServiceSetPersonalAccountProcedure,
			opts...,
		),
		convertPersonalToTeamAccount: connect.NewClient[v1alpha1.ConvertPersonalToTeamAccountRequest, v1alpha1.ConvertPersonalToTeamAccountResponse](
			httpClient,
			baseURL+UserAccountServiceConvertPersonalToTeamAccountProcedure,
			opts...,
		),
		isUserInAccount: connect.NewClient[v1alpha1.IsUserInAccountRequest, v1alpha1.IsUserInAccountResponse](
			httpClient,
			baseURL+UserAccountServiceIsUserInAccountProcedure,
			opts...,
		),
	}
}

// userAccountServiceClient implements UserAccountServiceClient.
type userAccountServiceClient struct {
	getUser                      *connect.Client[v1alpha1.GetUserRequest, v1alpha1.GetUserResponse]
	setUser                      *connect.Client[v1alpha1.SetUserRequest, v1alpha1.SetUserResponse]
	getUserAccounts              *connect.Client[v1alpha1.GetUserAccountsRequest, v1alpha1.GetUserAccountsResponse]
	setPersonalAccount           *connect.Client[v1alpha1.SetPersonalAccountRequest, v1alpha1.SetPersonalAccountResponse]
	convertPersonalToTeamAccount *connect.Client[v1alpha1.ConvertPersonalToTeamAccountRequest, v1alpha1.ConvertPersonalToTeamAccountResponse]
	isUserInAccount              *connect.Client[v1alpha1.IsUserInAccountRequest, v1alpha1.IsUserInAccountResponse]
}

// GetUser calls mgmt.v1alpha1.UserAccountService.GetUser.
func (c *userAccountServiceClient) GetUser(ctx context.Context, req *connect.Request[v1alpha1.GetUserRequest]) (*connect.Response[v1alpha1.GetUserResponse], error) {
	return c.getUser.CallUnary(ctx, req)
}

// SetUser calls mgmt.v1alpha1.UserAccountService.SetUser.
func (c *userAccountServiceClient) SetUser(ctx context.Context, req *connect.Request[v1alpha1.SetUserRequest]) (*connect.Response[v1alpha1.SetUserResponse], error) {
	return c.setUser.CallUnary(ctx, req)
}

// GetUserAccounts calls mgmt.v1alpha1.UserAccountService.GetUserAccounts.
func (c *userAccountServiceClient) GetUserAccounts(ctx context.Context, req *connect.Request[v1alpha1.GetUserAccountsRequest]) (*connect.Response[v1alpha1.GetUserAccountsResponse], error) {
	return c.getUserAccounts.CallUnary(ctx, req)
}

// SetPersonalAccount calls mgmt.v1alpha1.UserAccountService.SetPersonalAccount.
func (c *userAccountServiceClient) SetPersonalAccount(ctx context.Context, req *connect.Request[v1alpha1.SetPersonalAccountRequest]) (*connect.Response[v1alpha1.SetPersonalAccountResponse], error) {
	return c.setPersonalAccount.CallUnary(ctx, req)
}

// ConvertPersonalToTeamAccount calls mgmt.v1alpha1.UserAccountService.ConvertPersonalToTeamAccount.
func (c *userAccountServiceClient) ConvertPersonalToTeamAccount(ctx context.Context, req *connect.Request[v1alpha1.ConvertPersonalToTeamAccountRequest]) (*connect.Response[v1alpha1.ConvertPersonalToTeamAccountResponse], error) {
	return c.convertPersonalToTeamAccount.CallUnary(ctx, req)
}

// IsUserInAccount calls mgmt.v1alpha1.UserAccountService.IsUserInAccount.
func (c *userAccountServiceClient) IsUserInAccount(ctx context.Context, req *connect.Request[v1alpha1.IsUserInAccountRequest]) (*connect.Response[v1alpha1.IsUserInAccountResponse], error) {
	return c.isUserInAccount.CallUnary(ctx, req)
}

// UserAccountServiceHandler is an implementation of the mgmt.v1alpha1.UserAccountService service.
type UserAccountServiceHandler interface {
	GetUser(context.Context, *connect.Request[v1alpha1.GetUserRequest]) (*connect.Response[v1alpha1.GetUserResponse], error)
	SetUser(context.Context, *connect.Request[v1alpha1.SetUserRequest]) (*connect.Response[v1alpha1.SetUserResponse], error)
	GetUserAccounts(context.Context, *connect.Request[v1alpha1.GetUserAccountsRequest]) (*connect.Response[v1alpha1.GetUserAccountsResponse], error)
	SetPersonalAccount(context.Context, *connect.Request[v1alpha1.SetPersonalAccountRequest]) (*connect.Response[v1alpha1.SetPersonalAccountResponse], error)
	ConvertPersonalToTeamAccount(context.Context, *connect.Request[v1alpha1.ConvertPersonalToTeamAccountRequest]) (*connect.Response[v1alpha1.ConvertPersonalToTeamAccountResponse], error)
	IsUserInAccount(context.Context, *connect.Request[v1alpha1.IsUserInAccountRequest]) (*connect.Response[v1alpha1.IsUserInAccountResponse], error)
}

// NewUserAccountServiceHandler builds an HTTP handler from the service implementation. It returns
// the path on which to mount the handler and the handler itself.
//
// By default, handlers support the Connect, gRPC, and gRPC-Web protocols with the binary Protobuf
// and JSON codecs. They also support gzip compression.
func NewUserAccountServiceHandler(svc UserAccountServiceHandler, opts ...connect.HandlerOption) (string, http.Handler) {
	userAccountServiceGetUserHandler := connect.NewUnaryHandler(
		UserAccountServiceGetUserProcedure,
		svc.GetUser,
		opts...,
	)
	userAccountServiceSetUserHandler := connect.NewUnaryHandler(
		UserAccountServiceSetUserProcedure,
		svc.SetUser,
		opts...,
	)
	userAccountServiceGetUserAccountsHandler := connect.NewUnaryHandler(
		UserAccountServiceGetUserAccountsProcedure,
		svc.GetUserAccounts,
		opts...,
	)
	userAccountServiceSetPersonalAccountHandler := connect.NewUnaryHandler(
		UserAccountServiceSetPersonalAccountProcedure,
		svc.SetPersonalAccount,
		opts...,
	)
	userAccountServiceConvertPersonalToTeamAccountHandler := connect.NewUnaryHandler(
		UserAccountServiceConvertPersonalToTeamAccountProcedure,
		svc.ConvertPersonalToTeamAccount,
		opts...,
	)
	userAccountServiceIsUserInAccountHandler := connect.NewUnaryHandler(
		UserAccountServiceIsUserInAccountProcedure,
		svc.IsUserInAccount,
		opts...,
	)
	return "/mgmt.v1alpha1.UserAccountService/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.URL.Path {
		case UserAccountServiceGetUserProcedure:
			userAccountServiceGetUserHandler.ServeHTTP(w, r)
		case UserAccountServiceSetUserProcedure:
			userAccountServiceSetUserHandler.ServeHTTP(w, r)
		case UserAccountServiceGetUserAccountsProcedure:
			userAccountServiceGetUserAccountsHandler.ServeHTTP(w, r)
		case UserAccountServiceSetPersonalAccountProcedure:
			userAccountServiceSetPersonalAccountHandler.ServeHTTP(w, r)
		case UserAccountServiceConvertPersonalToTeamAccountProcedure:
			userAccountServiceConvertPersonalToTeamAccountHandler.ServeHTTP(w, r)
		case UserAccountServiceIsUserInAccountProcedure:
			userAccountServiceIsUserInAccountHandler.ServeHTTP(w, r)
		default:
			http.NotFound(w, r)
		}
	})
}

// UnimplementedUserAccountServiceHandler returns CodeUnimplemented from all methods.
type UnimplementedUserAccountServiceHandler struct{}

func (UnimplementedUserAccountServiceHandler) GetUser(context.Context, *connect.Request[v1alpha1.GetUserRequest]) (*connect.Response[v1alpha1.GetUserResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("mgmt.v1alpha1.UserAccountService.GetUser is not implemented"))
}

func (UnimplementedUserAccountServiceHandler) SetUser(context.Context, *connect.Request[v1alpha1.SetUserRequest]) (*connect.Response[v1alpha1.SetUserResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("mgmt.v1alpha1.UserAccountService.SetUser is not implemented"))
}

func (UnimplementedUserAccountServiceHandler) GetUserAccounts(context.Context, *connect.Request[v1alpha1.GetUserAccountsRequest]) (*connect.Response[v1alpha1.GetUserAccountsResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("mgmt.v1alpha1.UserAccountService.GetUserAccounts is not implemented"))
}

func (UnimplementedUserAccountServiceHandler) SetPersonalAccount(context.Context, *connect.Request[v1alpha1.SetPersonalAccountRequest]) (*connect.Response[v1alpha1.SetPersonalAccountResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("mgmt.v1alpha1.UserAccountService.SetPersonalAccount is not implemented"))
}

func (UnimplementedUserAccountServiceHandler) ConvertPersonalToTeamAccount(context.Context, *connect.Request[v1alpha1.ConvertPersonalToTeamAccountRequest]) (*connect.Response[v1alpha1.ConvertPersonalToTeamAccountResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("mgmt.v1alpha1.UserAccountService.ConvertPersonalToTeamAccount is not implemented"))
}

func (UnimplementedUserAccountServiceHandler) IsUserInAccount(context.Context, *connect.Request[v1alpha1.IsUserInAccountRequest]) (*connect.Response[v1alpha1.IsUserInAccountResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("mgmt.v1alpha1.UserAccountService.IsUserInAccount is not implemented"))
}
