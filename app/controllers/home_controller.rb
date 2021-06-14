class HomeController < ApplicationController
  def index; end

  def create
    MapperService.run(params).match do
      success do |user|
        flash[:success] = "Data from CSV file loaded successfully!"
        redirect_to root_path
      end

      failure(:invalid_csv) do |error_data|
        flash[:error] = "invalid csv, try again"
        render 'index'
      end

      failure(:mappings_saved_failed) do |error_data|
        flash[:error] = "something went wrong"
        render 'index'
      end

      failure do |exception|
        flash[:error] = "something went terribly wrong"
        render 'index'
      end
    end
  end
end