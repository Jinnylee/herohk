class API::CommentsController < ApplicationController

  def show
    @comment = Comment.where(post_id: params[:id])
  end

  def create
    @comment = Comment.new(comment_params)

    respond_to do |format|
      if @comment.save
        format.json { render json: @comment }
      else
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    def comment_params
      params.require(:insertComment).permit(:comment, :user_id, :post_id)
    end

end
