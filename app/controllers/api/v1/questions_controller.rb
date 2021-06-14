class Api::V1::QuestionsController < ApplicationController
  def index
    _sortable = params[:sort].present? ? "#{params[:sort]} #{sort_direction}" : 'created_at desc'
    @page = params[:page] || 1
    @per = params[:per] || 10
    @questions = Question.order(_sortable)
    @total_items = @questions.count
    @questions  = @questions.page(@page).per(@per)
  end

  private
  
  def sort_direction
    %w[asc desc].include?(params[:sort_dir]) ? params[:sort_dir] : 'asc'
  end
end