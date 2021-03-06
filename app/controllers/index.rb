#***************************************************
#***************************************************
##USERS USERS USERS USERS USERS USERS USERS USERS
#***************************************************
#***************************************************

get '/' do
  # Look in app/views/index.erb
  if session[:user_id]
  	redirect to '/homepage'
  else
  	erb :index
  end
end

#-----------------------

get '/about' do
	erb :about
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
	if @user.nil?
		@error_message = "Uh oh, buddy, looks like you've gotta get your shit together.  Try again."
		erb :sign_in
	else @user.authenticate(params[:password])
		session[:user_id] = @user.id
		session[:user_name] = @user.user_name
		redirect to '/homepage'
	end
end

#-----------------------

get '/sign_out' do
	session.clear
	session[:message] = "You have signed out."
	redirect to '/'
end

#-----------------------

get '/homepage' do
	if session[:user_id]
		@user = User.find(session[:user_id])
		@user_surveys = @user.authored_surveys
		erb :homepage
	else
		redirect to '/'
	end
end

#-----------------------

get '/users/:user_id' do
	@user = User.find(params[:user_id])
	erb :view_profile
end


post '/users/:user_id' do
	@user = User.find(params[:user_id])
	erb :view_profile
end

#-----------------------

get '/update_user' do
	if session[:user_id]
		@user = User.find(session[:user_id])
		erb :update_user
	else
		redirect to '/'
	end
end

post '/update_user' do
	if session[:user_id]
		@user = User.find(session[:user_id])
		@user.update(params)
		redirect to '/homepage'
	else
		redirect to '/'
	end
end

#-----------------------


get '/create_survey' do
	erb :create_survey
end

post '/create_survey' do
	@survey = Survey.create(title: params[:title], user_id: session[:user_id])
	if request.xhr?
    content_type :json
    @survey.to_json
  end
end

post '/create_survey/question' do
	@question = Question.create(text: params[:text], survey_id: params[:survey_id])
	if request.xhr?
    content_type :json
    @question.to_json
  end
end

post '/create_survey/response' do
	@question_id = params.delete("question_id").to_i
	responses = []
	params.each do |field, entry|
		responses << Response.create(text: entry, question_id: @question_id)
	end
	if request.xhr?
    content_type :json
    responses.to_json
  else
  	redirect to '/homepage'
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

get '/surveys/:survey_id' do
	@survey = Survey.find(params[:survey_id])
	if @survey.user_id == session[:user_id]
		erb :survey_face ###NEEDS TO CHANGE
	else
		redirect to "/take_survey/#{params[:survey_id]}"
	end
end

#-----------------------

get '/take_survey/:survey_id' do
	@survey = Survey.find(params[:survey_id])
	erb :survey_face

end


post '/submit' do
	params.each do |k, v|
		@question_id = k
		@response_id = v
		@participant_response = ParticipantResponse.create(user_id: session[:user_id], question_id: @question_id, response_id: @response_id)
	end
	redirect to '/homepage'
end

#-----------------------

get '/edit_survey/:survey_id' do
	@survey = Survey.find(params[:survey_id])
	erb :edit_survey
end

# Not used for Daniel's AJAX survey update page
post '/edit_survey/:survey_id' do
	@survey = Survey.find(params[:survey_id])
	@survey.title = params[:survey][:title]
  @survey.question = params[:survey][:question]
  @survey.response = params[:survey][:response]
  if survey.update
	  redirect to '/homepage'
	end
end

# Delete survey by ID
get '/delete_survey/:survey_id' do
  Survey.find(params[:survey_id]).destroy
  redirect to '/homepage'
end

# Update survey title text
post '/update_survey_title/:survey_id' do
  params[:survey_id]
  params[:title]
  Survey.find(params[:survey_id]).update(title: params[:title])
end

# Update question text by ID
post '/update_question_text/:question_id' do
  Question.find(params[:question_id]).update(text: params[:text])
end

# Delete question by ID
post '/delete_question/:question_id' do
  Question.find(params[:question_id]).destroy
end

# Update response text by ID
post '/update_response_text/:response_id' do
  Response.find(params[:response_id]).update(text: params[:text])
  # Question.last.update(text: "What issssssssss the gub'mint hiding?")
end

# Delete response by ID
post '/delete_response/:response_id' do
  Response.find(params[:response_id]).destroy
end
