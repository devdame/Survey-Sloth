#***************************************************
#***************************************************
##USERS USERS USERS USERS USERS USERS USERS USERS
#***************************************************
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
	@user = User.create(params)
	if @user.valid?
		session[:user_id] = @user.id
		session[:user_name] = @user.user_name
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
	if @user.authenticate(params[:password])
		session[:user_id] = @user.id
		session[:user_name] = @user.user_name
		redirect to '/homepage'
	else
		@error_message = "Uh oh, buddy, looks like you've gotta get your shit together.  Try again."
		erb :sign_in
	end
end

#-----------------------

get '/homepage' do
	@user = User.find(session[:user_id])
	@user_surveys = @user.authored_surveys
	erb :homepage
end

#-----------------------

get 'users/:user_id' do
	@user = User.find(params[:user_id])
	erb :view_profile
end


post 'users/:user_id' do
	@user = User.find(params[:user_id])
	erb :view_profile
end

#-----------------------


get '/create_survey' do
	erb :create_survey
end

post '/create_survey' do
	@post = Survey.create(params[:post])
	if @post.valid?
		@post_created = true
		redirect to '/homepage'
	else
		@error_message = "error"
		erb :create_survey
	end
end
#-----------------------



get '/logout' do
	session.clear
	redirect '/'
end

#******************************************************
#******************************************************
##SURVEYS SURVEYS SURVEYS SURVEYS SURVEYS SURVEYS 
#******************************************************
#******************************************************

get '/browse_all' do
	@surveys = Survey.all

	erb :browse_all
end

post '/browse_all' do
	erb :browse_all
end
#-----------------------

get '/survey/:survey_id' do
	@survey = Survey.find(params[:survey_id])
	if @survey.user_id == sessions[:user_id]
		erb :view_survey
	else
		redirect to "/take_survey/#{params[:survey_id]}"
	end
end

#-----------------------

get '/take_survey/:survey_id' do
	@survey = Survey.find(params[:survey_id])
	erb :take_survey
end

#-----------------------

get '/edit_survey/:survey_id' do
	@survey = Survey.find(params[:survey_id])
	erb :edit_survey
end

post '/edit_survey/:survey_id' do
	@survey = Survey.find(params[:survey_id])
	@survey.title = params[:survey][:title]
  @survey.question = params[:survey][:question]
  @survey.response = params[:survey][:response]
  if survey.update
	  redirect to '/homepage'
	end
end
