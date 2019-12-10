class Api::ItemsController < ApplicationController

	before_action :set_item, only: [:update, :destroy]
	before_action :set_menu, only: [:index]

	def index
		render json: @menu.items.all
	end
	
	def create
		item = Item.new(item_params)
		if item.save
			render json: item
		else
			render json: {errors: item.errors }, status: :unprocessable_entity 
		end
  end

	def update
		@item.update(item_params)
		render json: @item
	end

	def destroy
		@item.destroy
		render json: {message: "Item deleted."}
	end
	
	private

		def set_item
			@item = Item.find(params[:id])
		end

		def set_menu
			@menu = Menu.find(params[:menu_id])
		end

		def item_params
			params.require(:item).permit(:name, :description,:price, :menu_id)
		end

end
