#***************************************************
##USERS_____________________________________________
#***************************************************

get '/' do
  # Look in app/views/index.erb
  erb :index
end


#-----------------------
get '/sign_up' do
	erb :sign_up
end

post '/sign_up' do
	@user = User.create(params[:user])
	if @user.valid?
		session[:user_id] = @user.id
		session[:user_name] = @user.name
		redirect to '/homepage'
	else
		erb :homepage
	end
end
#-----------------------


get '/sign_in' do

	erb :sign_in
end

post '/sign_in' do
	@user = User.where(user_name: params[:user_name]).first
	if @user.authenticate(params[:user][:password])
		session[:user_id] = @user.id
		session[:user_name] = @user.name
		redirect to '/homepage'
	else
		@error_message = "Error"
		erb :sign_in
	end
end

#-----------------------

get '/homepage' do
	erb :homepage
end

#-----------------------

get 'view_profile' do
	erb :view_profile
end


post 'view_profile' do
	erb :view_profile
end

#-----------------------


get '/create_survey' do
	erb :create_survey
end

post '/create_survey' do
	erb :create_survey
end
#-----------------------

get '/logout' do
	erb :index
end


#******************************************************
##SURVEYS______________________________________________
#******************************************************

get '/browse_all' do
	erb :browse_all
end

post '/browse_all' do
	erb :browse_all
end


