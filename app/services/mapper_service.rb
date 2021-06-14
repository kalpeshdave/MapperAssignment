require 'csv'

class MapperService
  include SolidUseCase

  steps :validate_csv, :load_csv

  def validate_csv(params)
    data = CSV.open(params[:file].path, :headers => true).read
    if data.headers == allowed_headers
      continue(params)
    else
      fail :invalid_csv
    end
  end

  def load_csv(params)
    begin
      data = CSV.open(params[:file].path, :headers => true)
      questions = []
      data.each do |row|
        mapping = Mapping.find_or_create_by(name: row['Mapping'])
        role = Role.find_or_create_by(name: row['Role'])
        questions << { 
          mapping_id: mapping.id,
          role_id: role.id,
          title: row['Question'], 
          teaming_stage: row['Teaming Stages'], 
          appears_on_day: row['Appears (Day)'],
          frequency: row['Frequency'],
          type: row['Type'],
          is_required: row['Required?'].eql?('Yes') ? true : false,
          conditions: row['Conditions']
        }
      end
      Question.insert_all(questions)
      continue(params)
    rescue => e
      puts e.inspect
      fail :mappings_saved_failed
    end
  end

  private

  def allowed_headers
    %w(Pri Question Teaming\ Stages Appears\ (Day) Frequency Type Role Required? Conditions Mapping)
  end

end