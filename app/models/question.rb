class Question < ApplicationRecord
  # disable STI
  self.inheritance_column = :_type_disabled
  
  belongs_to :role
  belongs_to :mapping
end
