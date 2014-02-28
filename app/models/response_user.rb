class ResponseUser < ActiveRecord::Base
  belongs_to: user
  belongs_to: reponse
end
