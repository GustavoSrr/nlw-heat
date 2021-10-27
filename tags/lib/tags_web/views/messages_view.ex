defmodule TagsWeb.MessagesView do
  use TagsWeb, :view

  def render("create.json", %{message: message}) do
    %{
      result: "Mensagem criada!",
      message: message
    }
  end
end
